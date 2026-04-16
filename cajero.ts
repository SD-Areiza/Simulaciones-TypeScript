import promptSync from 'prompt-sync';

interface Transaccion {
    id: number;
    tipo: 'deposito' | 'retiro';
    monto: number;
    fecha: Date;
    saldoResultante: number;
}

interface CuentaBancaria {
    titular: string;
    saldoActual: number;
    transacciones: Transaccion[];
}

const prompt = promptSync({ sigint: true });

class CajeroAutomatico {
    cuenta: CuentaBancaria;
    private nextId: number = 1;

    constructor(titular: string, saldoInicial: number = 0) {
        this.cuenta = { titular, saldoActual: saldoInicial, transacciones: [] };
    }

    iniciarInteraccion(): void {
        let activo = true;

        while (activo) {
            console.log(`\n=== Cajero Automático - ${this.cuenta.titular} ===`);
            console.log('1. Consultar Saldo');
            console.log('2. Depositar Dinero');
            console.log('3. Retirar Dinero');
            console.log('4. Ver Estado de Cuenta');
            console.log('5. Salir');
            const opcion = prompt('Elige una opción: ');

            switch (opcion) {
                case '1':
                    console.log(`Saldo actual: $${this.cuenta.saldoActual.toFixed(2)}`);
                    break;
                case '2': {
                    const montoDep = Number(prompt('Ingresa el monto a depositar: '));
                    if (!Number.isFinite(montoDep) || montoDep <= 0) {
                        console.log('Monto inválido. Debe ser un número mayor que cero.');
                        break;
                    }
                    this.cuenta.saldoActual += montoDep;
                    this.registrarTransaccion('deposito', montoDep);
                    console.log('Depósito exitoso.');
                    break;
                }
                case '3': {
                    const montoRet = Number(prompt('Ingresa el monto a retirar: '));
                    if (!Number.isFinite(montoRet) || montoRet <= 0) {
                        console.log('Monto inválido. Debe ser un número mayor que cero.');
                        break;
                    }
                    if (montoRet > this.cuenta.saldoActual) {
                        console.log('Fondos insuficientes.');
                        break;
                    }
                    this.cuenta.saldoActual -= montoRet;
                    this.registrarTransaccion('retiro', montoRet);
                    console.log('Retiro exitoso.');
                    break;
                }
                case '4':
                    this.estadoDeCuenta();
                    break;
                case '5':
                    activo = false;
                    console.log('Gracias por usar nuestro banco.');
                    break;
                default:
                    console.log('Opción no válida. Por favor, elige un número del 1 al 5.');
            }
        }
    }

    private estadoDeCuenta(): void {
        console.log('\n--- Estado de Cuenta ---');
        console.log(`Titular: ${this.cuenta.titular}`);
        console.log(`Saldo actual: $${this.cuenta.saldoActual.toFixed(2)}`);
        if (this.cuenta.transacciones.length === 0) {
            console.log('No hay transacciones registradas.');
            return;
        }
        this.cuenta.transacciones.forEach((transaccion) => {
            console.log(`${transaccion.id}. ${transaccion.tipo.toUpperCase()} - $${transaccion.monto.toFixed(2)} - ${transaccion.fecha.toLocaleString()} - Saldo: $${transaccion.saldoResultante.toFixed(2)}`);
        });
    }

    private registrarTransaccion(tipo: 'deposito' | 'retiro', monto: number): void {
        this.cuenta.transacciones.push({
            id: this.nextId++,
            tipo,
            monto,
            fecha: new Date(),
            saldoResultante: this.cuenta.saldoActual,
        });
    }
}

const miCajero = new CajeroAutomatico('Estudiante', 100);
miCajero.iniciarInteraccion();