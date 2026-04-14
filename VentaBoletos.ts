import promptSync from 'prompt-sync';

const prompt = promptSync();

type StadiumZone = {
  name: string;
  price: number;
  capacity: number;
};

const stadiumZones: StadiumZone[] = [
  { name: 'General', price: 50, capacity: 100 },
  { name: 'Preferencial', price: 80, capacity: 50 },
  { name: 'VIP', price: 150, capacity: 10 }
];

const runTicketSales = (): void => {
  let isSelling = true;

  while (isSelling) {
    console.log('\n🎟️ TAQUILLA DEL ESTADIO');
    stadiumZones.forEach((zone, index) => {
      console.log(`${index + 1}. ${zone.name} - $${zone.price} (Cupos: ${zone.capacity})`);
    });

    const selectionStr = prompt('Seleccione la zona (1-3) o 4 para Salir -> ');
    const selection = Number(selectionStr) - 1;

    if (selectionStr === '4' || selectionStr === null) {
      isSelling = false;
      continue;
    }

    const isValidSelection = !isNaN(selection) && selection >= 0 && selection < stadiumZones.length;

    if (isValidSelection) {
      const selectedZone = stadiumZones[selection];

      if (selectedZone.capacity > 0) {
        const qtyStr = prompt(`¿Cuántos boletos desea para ${selectedZone.name}? -> `);
        const quantity = Number(qtyStr);

        if (!isNaN(quantity) && quantity > 0) {
          if (quantity <= selectedZone.capacity) {
            selectedZone.capacity -= quantity;
            const totalCost = quantity * selectedZone.price;

            console.log('\n✅ --- RECIBO DE COMPRA --- ✅');
            console.log(`Zona: ${selectedZone.name}`);
            console.log(`Cantidad: ${quantity}`);
            console.log(`Total Pagado: $${totalCost}`);
            console.log('¡Disfrute el evento!\n----------------------------');
          } else {
            console.log(`❌ Solo quedan ${selectedZone.capacity} boletos en esta zona.`);
          }
        } else {
          console.log('⚠️ Cantidad no válida.');
        }
      } else {
        console.log(`❌ La zona ${selectedZone.name} está AGOTADA.`);
      }
    } else {
      console.log('⚠️ Zona seleccionada inválida.');
    }
  }
};

runTicketSales();
