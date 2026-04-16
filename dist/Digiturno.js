"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
class FilaBancoInteractiva {
    constructor() {
        this.clientes = [];
        this.siguienteNumero = 1;
    }
    gestionarFila() {
        let operando = true;
        while (operando) {
            console.log('\n=== Gestión de Fila (FIFO) ===');
            console.log('1. Registrar llegada de nuevo cliente');
            console.log('2. Atender al siguiente cliente en espera');
            console.log('3. Mostrar fila');
            console.log('4. Salir');
            const accion = prompt('Elige una opción: ');
            if (accion === '1') {
                const turno = this.llegadaCliente();
                console.log(`Cliente registrado con turno ${turno}.`);
            }
            else if (accion === '2') {
                const atendido = this.atenderSiguiente();
                if (atendido) {
                    console.log(`Cliente ${atendido.turno} atendido.`);
                }
                else {
                    console.log('No hay clientes en espera.');
                }
            }
            else if (accion === '3') {
                this.mostrarFila();
            }
            else if (accion === '4') {
                operando = false;
                console.log('Saliendo de la gestión de fila.');
            }
            else {
                console.log('Opción no válida. Ingresa un número del 1 al 4.');
            }
        }
    }
    llegadaCliente() {
        const turno = `T-${String(this.siguienteNumero).padStart(3, '0')}`;
        this.clientes.push({ turno, estado: 'esperando' });
        this.siguienteNumero += 1;
        return turno;
    }
    atenderSiguiente() {
        const cliente = this.clientes.find((item) => item.estado === 'esperando');
        if (!cliente) {
            return null;
        }
        cliente.estado = 'atendido';
        return cliente;
    }
    mostrarFila() {
        console.log('\n--- Clientes en fila ---');
        if (this.clientes.length === 0) {
            console.log('No hay clientes registrados.');
            return;
        }
        this.clientes.forEach((cliente) => {
            console.log(`${cliente.turno} - ${cliente.estado}`);
        });
    }
}
const fila = new FilaBancoInteractiva();
fila.gestionarFila();
