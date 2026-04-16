"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
class SistemaHotelInteractivo {
    constructor() {
        this.tarifas = {
            ECONOMICA: 80,
            ESTANDAR: 150,
            SUITE: 300,
        };
        this.reservas = [];
    }
    iniciarReserva() {
        var _a;
        console.log('=== Reservas de Hotel ===');
        const categoriaStr = (_a = prompt('Elige la categoría (ECONOMICA: $80, ESTANDAR: $150, SUITE: $300): ')) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        const nochesStr = prompt('¿Cuántas noches te vas a hospedar?: ');
        if (!categoriaStr || !nochesStr) {
            console.log('Operación cancelada.');
            return;
        }
        const noches = Number(nochesStr);
        if (!Number.isInteger(noches) || noches <= 0) {
            console.log('Número de noches inválido. Debe ser un entero mayor que cero.');
            return;
        }
        if (!this.esCategoriaValida(categoriaStr)) {
            console.log('Categoría inválida. Debe ser ECONOMICA, ESTANDAR o SUITE.');
            return;
        }
        const categoria = categoriaStr;
        const reserva = this.crearReserva(categoria, noches);
        console.log(`Reserva creada para ${reserva.noches} noches en categoría ${reserva.categoria}.`);
        this.reporteReserva(reserva);
    }
    esCategoriaValida(categoria) {
        return categoria === 'ECONOMICA' || categoria === 'ESTANDAR' || categoria === 'SUITE';
    }
    crearReserva(categoria, noches) {
        const tarifaBase = this.tarifas[categoria];
        const descuento = this.calcularDescuento(noches);
        const total = tarifaBase * noches * (1 - descuento);
        const reserva = {
            id: `R-${Date.now()}`,
            categoria,
            noches,
            tarifaBase,
            descuento,
            total,
        };
        this.reservas.push(reserva);
        return reserva;
    }
    calcularDescuento(noches) {
        if (noches >= 10) {
            return 0.15;
        }
        if (noches >= 5) {
            return 0.1;
        }
        if (noches >= 3) {
            return 0.05;
        }
        return 0;
    }
    reporteReserva(reserva) {
        console.log('--- Detalle de la Reserva ---');
        console.log(`ID: ${reserva.id}`);
        console.log(`Categoría: ${reserva.categoria}`);
        console.log(`Noches: ${reserva.noches}`);
        console.log(`Tarifa por noche: $${reserva.tarifaBase.toFixed(2)}`);
        console.log(`Descuento aplicado: ${(reserva.descuento * 100).toFixed(0)}%`);
        console.log(`Total a pagar: $${reserva.total.toFixed(2)}`);
    }
}
const sistema = new SistemaHotelInteractivo();
sistema.iniciarReserva();
