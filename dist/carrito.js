"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const storeProducts = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Monitor', price: 300 },
    { id: 3, name: 'Teclado', price: 50 }
];
const runShoppingCart = () => {
    const cart = [];
    let isShopping = true;
    while (isShopping) {
        console.log('\n🛒 CATÁLOGO DE PRODUCTOS');
        storeProducts.forEach(prod => {
            console.log(`${prod.id}. ${prod.name} - $${prod.price}`);
        });
        console.log('4. Ver Total y Pagar\n5. Salir');
        const selection = prompt('Seleccione una opción o ID de producto -> ');
        if (selection === '5' || selection === null) {
            isShopping = false;
            continue;
        }
        if (selection === '4') {
            let subtotal = 0;
            console.log('\n--- Tus productos ---');
            cart.forEach((item) => {
                subtotal += item.price;
                console.log(`- ${item.name} ($${item.price})`);
            });
            const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
            const finalTotal = subtotal - discount;
            console.log(`\nSubtotal: $${subtotal}\nDescuento: $${discount}\nTotal a pagar: $${finalTotal}`);
            cart.length = 0;
        }
        else {
            const productId = Number(selection);
            let productToAdd = null;
            for (let i = 0; i < storeProducts.length; i++) {
                if (storeProducts[i].id === productId) {
                    productToAdd = storeProducts[i];
                    break;
                }
            }
            if (productToAdd !== null) {
                cart.push(productToAdd);
                console.log(`✅ ${productToAdd.name} añadido al carrito.`);
            }
            else {
                console.log('⚠️ Opción o producto no válido.');
            }
        }
    }
};
runShoppingCart();
