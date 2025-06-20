#!/usr/bin/env node

const axios = require('axios');
const readline = require('readline');

// Configuración del servidor HTTP MCP
const MCP_SERVER_URL = process.env.MCP_SERVER_URL;
const MCP_TOKEN = process.env.MCP_TOKEN;

class MCPBridge {
  constructor() {
    this.setupStdio();
  }

  setupStdio() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', async (line) => {
      try {
        const request = JSON.parse(line.trim());
        // Si es una notificación (no tiene id), no responder
        if (request.id === undefined || request.id === null) {
          return;
        }
        const response = await this.handleRequest(request);
        // Validar que la respuesta tenga los campos obligatorios JSON-RPC
        if (!response || typeof response !== 'object') {
          this.sendError(request.id, -32603, 'Internal error', 'Respuesta vacía o inválida del servidor MCP');
        } else {
          if (!('jsonrpc' in response)) {
            response.jsonrpc = '2.0';
          }
          if (!('id' in response)) {
            response.id = request.id;
          }
          // Solo permitir 'result' o 'error', nunca ambos ni ninguno
          const hasResult = 'result' in response;
          const hasError = 'error' in response;
          if ((hasResult && hasError) || (!hasResult && !hasError)) {
            this.sendError(response.id, -32603, 'Internal error', 'Respuesta sin result o error, o ambos presentes');
          } else {
            console.log(JSON.stringify(response));
          }
        }
      } catch (error) {
        this.sendError(null, -32700, 'Parse error', error.message);
      }
    });

    rl.on('close', () => {
      process.exit(0);
    });
  }

  async handleRequest(request) {
    try {
      // Hacer la petición HTTP al servidor MCP real
      const httpResponse = await axios.post(MCP_SERVER_URL, request, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MCP_TOKEN}`
        },
        timeout: 30000
      });

      return httpResponse.data;
    } catch (error) {
      return this.createErrorResponse(
        request.id,
        -32603,
        'Internal error',
        error.message
      );
    }
  }

  createErrorResponse(id, code, message, data) {
    // Si el id es null o undefined, usar string vacío para evitar errores de validación estricta
    let safeId = (id === null || id === undefined) ? "" : id;
    return {
      jsonrpc: '2.0',
      id: safeId,
      error: {
        code: code,
        message: message,
        data: data
      }
    };
  }

  sendError(id, code, message, data) {
    const error = this.createErrorResponse(id, code, message, data);
    console.log(JSON.stringify(error));
  }
}

// Iniciar el puente
new MCPBridge();

// Manejar señales de terminación
process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});