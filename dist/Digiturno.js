"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const runQueueSystem = () => {
    const queue = [];
    const history = [];
    let ticketCounter = 1;
    let isManaging = true;
    while (isManaging) {
        console.log('\n👥 SISTEMA DE DIGITURNO');
        const option = prompt('1. Solicitar | 2. Ver cola | 3. Llamar | 4. Historial | 5. Salir -> ');
        if (option === '5' || option === null) {
            isManaging = false;
            continue;
        }
        if (option === '1') {
            const userName = prompt('Ingrese su nombre: ');
            if (userName && userName.trim() !== '') {
                const newTicket = { ticket: `T-${ticketCounter}`, name: userName };
                queue.push(newTicket);
                console.log(`✅ Turno ${newTicket.ticket} asignado a ${newTicket.name}.`);
                ticketCounter++;
            }
            else {
                console.log('⚠️ Nombre inválido.');
            }
        }
        else if (option === '2') {
            const queueStatus = queue.length === 0
                ? 'La cola está vacía.'
                : `Hay ${queue.length} persona(s) en espera.`;
            console.log(`\n📊 Estado: ${queueStatus}`);
        }
        else if (option === '3') {
            if (queue.length > 0) {
                const calledPerson = queue.shift();
                if (calledPerson) {
                    history.push(calledPerson);
                    console.log(`\n🔔 LLAMANDO A: ${calledPerson.name} (Turno ${calledPerson.ticket})`);
                }
            }
            else {
                console.log('⚠️ No hay nadie en la cola.');
            }
        }
        else if (option === '4') {
            console.log('\n📜 Historial de Atendidos:');
            if (history.length === 0) {
                console.log('Aún no se ha atendido a nadie.');
            }
            else {
                history.forEach((person, index) => {
                    console.log(`${index + 1}. ${person.name} (${person.ticket})`);
                });
            }
        }
    }
};
runQueueSystem();
