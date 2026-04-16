import promptSync from 'prompt-sync';

type TipoBoleta = 'adulto' | 'estudiante' | 'nino';

interface Funcion {
    titulo: string;
    horarios: string[];
    asientosDisponibles: Record<string, number>;
    precios: Record<TipoBoleta, number>;
}

const prompt = promptSync({ sigint: true });

class CineInteractivo {
    private peliculas: Record<string, Funcion> = {
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

    venderEntradasPorPrompt(): void {
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
        const tipoBoleta = tipoBoletaInput?.toLowerCase() as TipoBoleta;
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
        } catch (error: any) {
            console.log(`Error en la venta: ${error.message}`);
        }
    }

    private venderBoletas(peliId: string, horario: string, tipoBoleta: TipoBoleta, cantidad: number): number {
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