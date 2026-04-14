import promptSync from 'prompt-sync';

const prompt = promptSync();

type Hotel = {
  name: string;
  capacity: number;
  reservations: number[];
};

const hotels: Hotel[] = [
  { name: 'Hotel Paraíso', capacity: 5, reservations: [] },
  { name: 'Vista al Mar', capacity: 2, reservations: [] }
];

const runHotelSystem = (): void => {
  let isRunning = true;

  while (isRunning) {
    console.log('\n🏨 SISTEMA DE HOTELES');
    const menu = prompt('1. Ver disponibles | 2. Reservar | 3. Cancelar | 4. Salir -> ');

    if (menu === '4' || menu === null) {
      isRunning = false;
      continue;
    }

    if (menu === '1') {
      console.log('\n--- Hoteles Disponibles ---');
      hotels.forEach((hotel, index) => {
        const availableBeds = hotel.capacity - hotel.reservations.length;
        console.log(`${index + 1}. ${hotel.name} (Cupos: ${availableBeds})`);
      });
    } else if (menu === '2') {
      const hotelIndexStr = prompt('Ingrese el número del hotel a reservar: ');
      const hotelIndex = Number(hotelIndexStr) - 1;
      const isValidIndex = !isNaN(hotelIndex) && hotelIndex >= 0 && hotelIndex < hotels.length;

      if (isValidIndex) {
        const selectedHotel = hotels[hotelIndex];
        const hasCapacity = selectedHotel.reservations.length < selectedHotel.capacity;
        const message = hasCapacity
          ? '✅ Reserva confirmada. Su ID es: '
          : '❌ Lo sentimos, el hotel está lleno.';

        if (hasCapacity) {
          const reservationId = Math.floor(Math.random() * 10000);
          selectedHotel.reservations.push(reservationId);
          console.log(message + reservationId);
        } else {
          console.log(message);
        }
      } else {
        console.log('⚠️ Selección inválida.');
      }
    } else if (menu === '3') {
      const idStr = prompt('Ingrese el ID de su reserva: ');
      const resId = Number(idStr);
      let found = false;

      for (let i = 0; i < hotels.length; i++) {
        for (let j = 0; j < hotels[i].reservations.length; j++) {
          if (hotels[i].reservations[j] === resId) {
            hotels[i].reservations.splice(j, 1);
            found = true;
            console.log('✅ Reserva cancelada con éxito.');
            break;
          }
        }
        if (found) {
          break;
        }
      }

      if (!found) {
        console.log('❌ ID de reserva no encontrado.');
      }
    }
  }
};

runHotelSystem();
