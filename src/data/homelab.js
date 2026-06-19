export const HOST = {
  name: "bandito",
  cpu: "Intel i3-2120",
  ram: "12 GB",
  storage: {
    system: "SSD 210 GB",
    nas: "RAID 1 · 2×1 TB → /mnt/tank",
  },
  hypervisor: "Proxmox VE",
  vm: {
    name: "Homelab",
    vmid: 100,
    os: "Ubuntu 24.04 LTS",
  },
  tailnet: "<tailnet>.ts.net",
};

export const STATS = [
  { label: "Servicios en Docker", value: "8" },
  { label: "Puertos expuestos a internet", value: "0" },
  { label: "RAM total (VM: 10 GB)", value: "12 GB" },
  { label: "Almacenamiento NAS", value: "2 TB RAID 1" },
];

export const SERVICES = [
  {
    name: "AdGuard Home",
    category: "DNS & Red",
    role: "DNS a nivel red con bloqueo de anuncios y rastreo",
    stack: ["Docker", "AdGuard Home"],
    inDocker: true,
  },
  {
    name: "Homepage",
    category: "Gestión",
    role: "Dashboard central con acceso a todos los servicios",
    stack: ["Docker", "Homepage"],
    inDocker: true,
  },
  {
    name: "Immich",
    category: "Almacenamiento",
    role: "Gestión y backup de fotos con ML (alternativa self-hosted a Google Photos)",
    stack: ["Docker", "PostgreSQL", "Redis", "Machine Learning"],
    notes: "Fotos en /mnt/tank",
    inDocker: true,
  },
  {
    name: "Vaultwarden",
    category: "Seguridad",
    role: "Gestor de contraseñas compatible con Bitwarden, cifrado con cert de Tailscale",
    stack: ["Docker", "Bitwarden API", "HTTPS"],
    inDocker: true,
  },
  {
    name: "Ollama + Open WebUI",
    category: "IA",
    role: "Inferencia de LLMs local con interfaz web — modelo gemma3:1b elegido por el i3-2120",
    stack: ["Docker", "Ollama", "gemma3:1b"],
    notes: "Red Docker dedicada para resolución por nombre de contenedor",
    inDocker: true,
  },
  {
    name: "Ticketera",
    category: "Desarrollo",
    role: "Proyecto web propio con autodeploy CI/CD integrado",
    stack: ["Docker", "PostgreSQL", "CI/CD"],
    inDocker: true,
  },
  {
    name: "Uptime Kuma",
    category: "Monitoreo",
    role: "Monitoreo interno de disponibilidad de servicios",
    stack: ["Docker"],
    inDocker: true,
  },
  {
    name: "Portainer",
    category: "Gestión",
    role: "Gestión visual de contenedores Docker",
    stack: ["Docker"],
    inDocker: true,
  },
  {
    name: "Samba",
    category: "Almacenamiento",
    role: "Servidor de archivos NAS — comparte /mnt/tank entre PCs de la red",
    stack: ["systemd", "Samba"],
    inDocker: false,
  },
  {
    name: "Nginx Proxy Manager",
    category: "Proxy",
    role: "Reverse proxy (despriorizado en favor de Tailscale por el CGNAT)",
    stack: ["systemd", "Nginx"],
    inDocker: false,
  },
];

export const SERVICE_CATEGORIES = [
  "DNS & Red",
  "Seguridad",
  "Monitoreo",
  "IA",
  "Almacenamiento",
  "Gestión",
  "Desarrollo",
  "Proxy",
];

export const ARCH_DECISIONS = [
  {
    id: "tailscale-cgnat",
    title: "Tailscale en lugar de reverse proxy",
    problem:
      "El ISP opera bajo CGNAT: no es posible abrir puertos hacia internet de forma confiable. Un reverse proxy como Nginx o Caddy requiere IP pública alcanzable.",
    decision:
      "Tailscale como capa de acceso remoto exclusiva. Nginx Proxy Manager quedó relegado a uso interno.",
    why: "Tailscale crea una mesh cifrada WireGuard sin necesitar IP pública ni puertos abiertos. Acceso desde cualquier red con zero-config adicional. Ningún servicio queda expuesto a internet.",
    tags: ["CGNAT", "Tailscale", "WireGuard", "seguridad"],
  },
  {
    id: "no-watchtower",
    title: "Watchtower excluido deliberadamente",
    problem:
      "Watchtower puede actualizar contenedores automáticamente, pero las actualizaciones inesperadas rompen servicios sin aviso — especialmente crítico en stacks como Immich o Vaultwarden.",
    decision:
      "Sin actualizaciones automáticas. Cada update es manual y consciente.",
    why: "El control sobre cuándo y qué se actualiza supera la comodidad del autopatch. Si un update de imagen introduce un breaking change, el impacto es predecible y acotado.",
    tags: ["Docker", "operaciones", "estabilidad"],
  },
  {
    id: "monitor-independiente",
    title: "Monitor externo en dispositivo físicamente separado",
    problem:
      "Un monitor que corre en el mismo host que monitorea no puede avisar cuando ese host cae.",
    decision:
      'Teléfono con Termux como "orbital server": scripts que consultan los servicios y notifican por Telegram cuando algo falla.',
    why: "El monitor sobrevive a una caída total del host. Es físicamente independiente, con su propia conexión de red y fuente de energía.",
    tags: ["monitoreo", "disponibilidad", "Termux", "Telegram"],
  },
  {
    id: "tailscale-host-y-vm",
    title: "Tailscale en el host Proxmox Y en la VM",
    problem:
      "Si Tailscale solo corre en la VM y la VM crashea, se pierde el acceso remoto al hipervisor para diagnosticar.",
    decision:
      "Tailscale instalado tanto en el host Proxmox como en la VM Homelab, con gestión independiente.",
    why: "Si la VM falla, sigo teniendo acceso directo a Proxmox para reiniciarla. El plano de gestión del hipervisor no depende del estado de la VM.",
    tags: ["Tailscale", "Proxmox", "alta disponibilidad"],
  },
  {
    id: "red-docker-ollama",
    title: "Red Docker dedicada para Ollama + Open WebUI",
    problem:
      "Open WebUI necesita comunicarse con Ollama por nombre de contenedor, no por IP. El enfoque host-gateway mezcla namespaces de red.",
    decision:
      "Red bridge Docker exclusiva para el stack de IA. Los contenedores se resuelven entre sí por nombre.",
    why: "Aísla el tráfico de IA del resto de los servicios. Permite que Open WebUI llame a `http://ollama:11434` sin hardcodear IPs ni exponer el puerto a la red del host.",
    tags: ["Docker", "networking", "IA", "Ollama"],
  },
  {
    id: "stack-por-servicio",
    title: "Un stack aislado por servicio",
    problem:
      "Un solo docker-compose con todos los servicios crea dependencias cruzadas, dificulta el debug y hace que un fallo en un servicio afecte a otros.",
    decision:
      "Cada servicio tiene su propio directorio bajo `/opt/homelab/<servicio>/` con su `docker-compose.yml` y `.env`.",
    why: "Aislamiento total: puedo levantar, parar o recrear un servicio sin tocar los demás. La comunicación entre contenedores se habilita solo donde se justifica explícitamente.",
    tags: ["Docker", "arquitectura", "aislamiento"],
  },
];

export const TECH_STACK = [
  { name: "Proxmox VE", category: "Hipervisor", description: "Virtualización del host físico" },
  { name: "Docker", category: "Contenedores", description: "Runtime para todos los servicios" },
  { name: "Tailscale", category: "Red", description: "Mesh VPN sobre WireGuard" },
  { name: "Ubuntu 24.04", category: "OS", description: "Sistema operativo de la VM principal" },
  { name: "Samba", category: "Almacenamiento", description: "Servidor de archivos NAS" },
  { name: "Termux", category: "Monitoreo", description: "Monitor externo en Android" },
];

export const ROADMAP = [
  {
    title: "Wake-on-LAN",
    description: "Encender y apagar bandito remotamente por la mesh de Tailscale.",
    reason: "El i3-2120 consume entre 30–40 W en idle. Poder apagarlo cuando no se usa reduce consumo sin perder disponibilidad cuando importa.",
  },
  {
    title: "Router propio + VLANs",
    description: "Reemplazar el router del ISP por hardware propio entre el módem y el switch para segmentar la red en VLANs.",
    reason: "Aislar el tráfico del lab del resto de la red doméstica, crear una VLAN IoT, y tener control real del routing sin depender del firmware del ISP.",
  },
  {
    title: "Kubernetes / K3s",
    description: "Migrar a orquestación con K3s cuando se expanda el hardware.",
    reason: "Docker Compose escala bien para el volumen actual, pero la RAM actual (8 GB) no deja margen para el overhead de K8s. K3s es el siguiente paso natural cuando haya más recursos.",
  },
];
