# Puente MCP para tseyor.org

Este proyecto es un puente (bridge) que conecta el protocolo Model Context Protocol (MCP) con los servicios de tseyor.org, permitiendo la integración de herramientas y recursos de la comunidad Tseyor con plataformas compatibles con MCP.

## ¿Qué es MCP?
MCP (Model Context Protocol) es un estándar abierto para la comunicación entre servidores y clientes de inteligencia artificial, bots y asistentes virtuales. Permite que diferentes sistemas se comuniquen usando un formato común basado en JSON-RPC 2.0.

## ¿Por qué este puente?
El objetivo de este puente es facilitar el acceso a los recursos, herramientas y datos de tseyor.org desde asistentes inteligentes, bots y otras plataformas compatibles con MCP, sin exponer directamente la lógica interna del servidor de tseyor.org.

## Requisitos

- **Windows 10/11** (también funciona en Linux/Mac, pero aquí se explica para Windows)
- **Git** (para clonar el repositorio)
- **Node.js** (versión 20 o superior)
- **npm** (se instala junto con Node.js)

### Cómo instalar los requisitos en Windows

1. **Instalar Git:**
   - Descarga el instalador desde [git-scm.com](https://git-scm.com/download/win)
   - Ejecuta el instalador y sigue los pasos (puedes dejar las opciones por defecto)
   - Al finalizar, abre una terminal (PowerShell o CMD) y ejecuta:
     ```sh
     git --version
     ```
     Deberías ver la versión instalada.

2. **Instalar Node.js y npm:**
   - Descarga el instalador desde [nodejs.org](https://nodejs.org/)
   - Elige la versión LTS recomendada (20.x o superior)
   - Ejecuta el instalador y sigue los pasos (deja las opciones por defecto)
   - Al finalizar, abre una terminal y ejecuta:
     ```sh
     node --version
     npm --version
     ```
     Deberías ver las versiones instaladas.

## Instalación

1. **Clona este repositorio:**
   ```sh
   git clone https://github.com/msoler75/puente_mcp_tseyor.org.git
   cd puente_mcp_tseyor.org
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta el token y la URL si es necesario):
   ```env
   MCP_SERVER_URL=https://tseyor.org/mcp
   MCP_TOKEN=TU_TOKEN_MCP
   ```

## Uso

Para iniciar el puente ejecuta:
```sh
node mcp_stdio_bridge.js
```

El puente leerá mensajes JSON-RPC 2.0 por la entrada estándar (stdin) y enviará las respuestas por la salida estándar (stdout), actuando como intermediario entre un cliente MCP y el servidor de tseyor.org.

## Notas para principiantes
- **No subas el archivo `.env` a GitHub**: contiene información sensible.
- Si tienes dudas sobre Node.js o npm, consulta [nodejs.org](https://nodejs.org/) y [npmjs.com](https://www.npmjs.com/).
- Puedes modificar el archivo `.env` para cambiar el token o la URL del servidor MCP.

## Licencia
MIT
