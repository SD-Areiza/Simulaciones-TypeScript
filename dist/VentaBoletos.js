"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
class CineInteractivo {
    constructor() {
        this.peliculas = {
            '1': {
                titulo: 'Matrix',
                horarios: ['18:00', '20:30'],
                asientosDisponibles: { '18:00': 50, '20:30': 50 },
                precios: { adulto: 10, estudiante: 7, nino: 5 },
            },
            '2': {
                titulo: 'Dune',
                horarios: ['17:00', '21:00'],
                asientosDisponibles: { '17:00': 50, '21:00': 50 },
                precios: { adulto: 10, estudiante: 7, nino: 5 },
            },
        };
    }
    venderEntradasPorPrompt() {
        console.log('=== Venta de Boletas ===');
        console.log('Películas disponibles:');
        for (const id in this.peliculas) {
            console.log(`${id}. ${this.peliculas[id].titulo}`);
        }
        const peliId = prompt('Ingresa el ID de la película: ');
        const pelicula = peliId ? this.peliculas[peliId] : undefined;
        if (!pelicula) {
            console.log('Película inválida.');
            return;
        }
        console.log(`Horarios disponibles para ${pelicula.titulo}: ${pelicula.horarios.join(', ')}`);
        const horario = prompt('Ingresa el horario: ');
        if (!horario || !pelicula.horarios.includes(horario)) {
            console.log('Horario inválido.');
            return;
        }
        const tipoBoletaInput = prompt('Tipo de boleta (adulto, estudiante, nino): ');
        const tipoBoleta = tipoBoletaInput === null || tipoBoletaInput === void 0 ? void 0 : tipoBoletaInput.toLowerCase();
        if (tipoBoleta !== 'adulto' && tipoBoleta !== 'estudiante' && tipoBoleta !== 'nino') {
            console.log('Tipo de boleta inválido.');
            return;
        }
        const cantidad = Number(prompt('Cantidad de boletas: '));
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            console.log('Cantidad inválida. Debe ser un número entero mayor que cero.');
            return;
        }
        try {
            const total = this.venderBoletas(peliId, horario, tipoBoleta, cantidad);
            console.log(`¡Venta exitosa! Se registraron ${cantidad} entradas para el horario ${horario}. Total: $${total.toFixed(2)}`);
        }
        catch (error) {
            console.log(`Error en la venta: ${error.message}`);
        }
    }
    venderBoletas(peliId, horario, tipoBoleta, cantidad) {
        const pelicula = this.peliculas[peliId];
        if (!pelicula) {
            throw new Error('Película no encontrada.');
        }
        if (!pelicula.horarios.includes(horario)) {
            throw new Error('Horario no disponible.');
        }
        const disponibles = pelicula.asientosDisponibles[horario];
        if (disponibles === undefined) {
            throw new Error('Horario inválido.');
        }
        if (cantidad > disponibles) {
            throw new Error(`Solo hay ${disponibles} asientos disponibles para este horario.`);
        }
        pelicula.asientosDisponibles[horario] -= cantidad;
        return pelicula.precios[tipoBoleta] * cantidad;
    }
}
const cine = new CineInteractivo();
cine.venderEntradasPorPrompt();
