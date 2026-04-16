"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
class ServicioLavadorasInteractivo {
    constructor() {
        this.lavadoras = [
            { id: 'LAV-1', disponible: true, horasAlquiladas: 0 },
            { id: 'LAV-2', disponible: true, horasAlquiladas: 0 },
            { id: 'LAV-3', disponible: true, horasAlquiladas: 0 },
        ];
    }
    interfazAlquiler() {
        let activo = true;
        while (activo) {
            console.log('\n=== Servicio de Lavadoras ===');
            console.log('1. Alquilar Lavadora');
            console.log('2. Devolver Lavadora');
            console.log('3. Ver Estado de Lavadoras');
            console.log('4. Salir');
            const accion = prompt('¿Qué deseas hacer? ');
            if (accion === '1') {
                const horas = Number(prompt('¿Por cuántas horas deseas alquilarla? (Precio base $2/hora): '));
                if (!Number.isInteger(horas) || horas <= 0) {
                    console.log('Duración inválida. Debe ser un número entero mayor que cero.');
                    continue;
                }
                try {
                    const id = this.alquilar(horas);
                    console.log(`Lavadora ${id} alquilada por ${horas} horas. Total: $${(2 * horas).toFixed(2)}`);
                }
                catch (error) {
                    console.log(error.message);
                }
            }
            else if (accion === '2') {
                const id = prompt('Ingresa el ID de la lavadora a devolver (ej. LAV-1): ');
                if (!id) {
                    console.log('Debe ingresar un ID.');
                    continue;
                }
                try {
                    this.devolver(id.toUpperCase());
                    console.log(`Lavadora ${id.toUpperCase()} devuelta con éxito.`);
                }
                catch (error) {
                    console.log(error.message);
                }
            }
            else if (accion === '3') {
                this.mostrarEstado();
            }
            else if (accion === '4') {
                activo = false;
                console.log('Saliendo del servicio de lavadoras.');
            }
            else {
                console.log('Opción no válida. Ingresa un número del 1 al 4.');
            }
        }
    }
    alquilar(horas) {
        const lavadora = this.lavadoras.find((item) => item.disponible);
        if (!lavadora) {
            throw new Error('No hay lavadoras disponibles en este momento.');
        }
        lavadora.disponible = false;
        lavadora.horasAlquiladas = horas;
        return lavadora.id;
    }
    devolver(id) {
        const lavadora = this.lavadoras.find((item) => item.id === id);
        if (!lavadora) {
            throw new Error('ID de lavadora no válido.');
        }
        if (lavadora.disponible) {
            throw new Error('Esa lavadora ya está disponible.');
        }
        lavadora.disponible = true;
        lavadora.horasAlquiladas = 0;
    }
    mostrarEstado() {
        console.log('\n--- Estado de Lavadoras ---');
        this.lavadoras.forEach((lavadora) => {
            console.log(`${lavadora.id} - ${lavadora.disponible ? 'Disponible' : `Alquilada por ${lavadora.horasAlquiladas} horas`}`);
        });
    }
}
const servicio = new ServicioLavadorasInteractivo();
servicio.interfazAlquiler();
