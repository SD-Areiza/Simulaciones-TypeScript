"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const laundryServices = [
    { id: 1, name: 'Lavado Básico', pricePerKg: 5 },
    { id: 2, name: 'Lavado y Secado', pricePerKg: 7 },
    { id: 3, name: 'Lavado Premium', pricePerKg: 10 }
];
const runLaundryApp = () => {
    const orders = [];
    let nextOrderId = 1;
    let isRunning = true;
    while (isRunning) {
        console.log('\n🧺 SISTEMA DE LAVANDERÍA');
        console.log('1. Registrar pedido');
        console.log('2. Ver pedidos en curso');
        console.log('3. Actualizar estado de pedido');
        console.log('4. Historial de pedidos entregados');
        console.log('5. Salir');
        const option = prompt('Seleccione una opción -> ');
        if (option === '5' || option === null) {
            isRunning = false;
            continue;
        }
        if (option === '1') {
            const customer = prompt('Ingrese el nombre del cliente: ');
            if (!customer || customer.trim() === '') {
                console.log('⚠️ Nombre inválido.');
                continue;
            }
            console.log('\n--- Servicios disponibles ---');
            laundryServices.forEach(service => {
                console.log(`${service.id}. ${service.name} - $${service.pricePerKg} por kg`);
            });
            const serviceId = Number(prompt('Seleccione el servicio (1-3) -> '));
            const selectedService = laundryServices.find(service => service.id === serviceId);
            if (!selectedService) {
                console.log('⚠️ Servicio inválido.');
                continue;
            }
            const kilos = Number(prompt('Ingrese la cantidad de kilos -> '));
            if (isNaN(kilos) || kilos <= 0) {
                console.log('⚠️ Cantidad de kilos inválida.');
                continue;
            }
            const total = kilos * selectedService.pricePerKg;
            const newOrder = {
                id: nextOrderId,
                customer: customer.trim(),
                service: selectedService.name,
                kilos,
                total,
                status: 'Pendiente'
            };
            orders.push(newOrder);
            nextOrderId += 1;
            console.log(`✅ Pedido registrado: #${newOrder.id} para ${newOrder.customer}. Total: $${newOrder.total}`);
        }
        else if (option === '2') {
            console.log('\n📋 Pedidos en curso:');
            const pendingOrders = orders.filter(order => order.status !== 'Listo');
            if (pendingOrders.length === 0) {
                console.log('No hay pedidos en curso.');
                continue;
            }
            pendingOrders.forEach(order => {
                console.log(`- ${order.id}: ${order.customer} | ${order.service} | ${order.kilos} kg | $${order.total} | ${order.status}`);
            });
        }
        else if (option === '3') {
            const orderId = Number(prompt('Ingrese el ID del pedido a actualizar -> '));
            const order = orders.find(item => item.id === orderId);
            if (!order) {
                console.log('❌ Pedido no encontrado.');
                continue;
            }
            console.log(`Pedido encontrado: ${order.customer} - ${order.service} | ${order.kilos} kg | ${order.status}`);
            console.log('1. En Proceso');
            console.log('2. Listo');
            const statusOption = prompt('Seleccione el nuevo estado -> ');
            if (statusOption === '1') {
                order.status = 'En Proceso';
                console.log(`✅ Pedido #${order.id} actualizado a En Proceso.`);
            }
            else if (statusOption === '2') {
                order.status = 'Listo';
                console.log(`✅ Pedido #${order.id} actualizado a Listo.`);
            }
            else {
                console.log('⚠️ Opción de estado inválida.');
            }
        }
        else if (option === '4') {
            console.log('\n📜 Historial de pedidos entregados:');
            const deliveredOrders = orders.filter(order => order.status === 'Listo');
            if (deliveredOrders.length === 0) {
                console.log('No se ha entregado ningún pedido aún.');
                continue;
            }
            deliveredOrders.forEach(order => {
                console.log(`- ${order.id}: ${order.customer} | ${order.service} | ${order.kilos} kg | $${order.total}`);
            });
        }
        else {
            console.log('⚠️ Opción inválida.');
        }
    }
};
runLaundryApp();
