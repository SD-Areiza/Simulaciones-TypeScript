import promptSync from 'prompt-sync';

type Categoria = 'ECONOMICA' | 'ESTANDAR' | 'SUITE';

interface Reserva {
    id: string;
    categoria: Categoria;
    noches: number;
    tarifaBase: number;
    descuento: number;
    total: number;
}

const prompt = promptSync({ sigint: true });

class SistemaHotelInteractivo {
    private tarifas: Record<Categoria, number> = {
        ECONOMICA: 80,
        ESTANDAR: 150,
        SUITE: 300,
    };
    private reservas: Reserva[] = [];

    iniciarReserva(): void {
        console.log('=== Reservas de Hotel ===');
        const categoriaStr = prompt('Elige la categoría (ECONOMICA: $80, ESTANDAR: $150, SUITE: $300): ')?.toUpperCase();
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

        const categoria = categoriaStr as Categoria;
        const reserva = this.crearReserva(categoria, noches);
        console.log(`Reserva creada para ${reserva.noches} noches en categoría ${reserva.categoria}.`);
        this.reporteReserva(reserva);
    }

    private esCategoriaValida(categoria: string): categoria is Categoria {
        return categoria === 'ECONOMICA' || categoria === 'ESTANDAR' || categoria === 'SUITE';
    }

    private crearReserva(categoria: Categoria, noches: number): Reserva {
        const tarifaBase = this.tarifas[categoria];
        const descuento = this.calcularDescuento(noches);
        const total = tarifaBase * noches * (1 - descuento);
        const reserva: Reserva = {
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

    private calcularDescuento(noches: number): number {
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

    private reporteReserva(reserva: Reserva): void {
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