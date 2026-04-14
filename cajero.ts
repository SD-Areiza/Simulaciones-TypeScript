import promptSync from 'prompt-sync';

const prompt = promptSync();

type Account = {
  owner: string;
  balance: number;
};

type DestinationAccount = {
  accountNum: string;
  owner: string;
};

const myAccount: Account = { owner: 'Carlos Dev', balance: 1500 };
const destinationAccounts: DestinationAccount[] = [
  { accountNum: '123456', owner: 'Ana' },
  { accountNum: '654321', owner: 'Juan' }
];

const runATM = (): void => {
  let isRunning = true;

  while (isRunning) {
    console.log(`\n🏧 BIENVENIDO ${myAccount.owner}`);
    const action = prompt('1. Consultar | 2. Ingresar | 3. Retirar | 4. Transferir | 5. Salir -> ');

    if (action === '5' || action === null) {
      isRunning = false;
      continue;
    }

    if (action === '1') {
      console.log(`\n💰 Su saldo actual es: $${myAccount.balance}`);
    } else if (action === '2') {
      const depositInput = prompt('Ingrese el monto a consignar: $');
      const depositAmount = Number(depositInput);
      const isValidDeposit = !isNaN(depositAmount) && depositAmount > 0;

      if (isValidDeposit) {
        myAccount.balance += depositAmount;
        console.log(`✅ Depósito exitoso. Nuevo saldo: $${myAccount.balance}`);
      } else {
        console.log('⚠️ Monto numérico inválido.');
      }
    } else if (action === '3') {
      const amountInput = prompt('Ingrese el monto a retirar: $');
      const amount = Number(amountInput);

      if (!isNaN(amount) && amount > 0) {
        if (amount <= myAccount.balance) {
          myAccount.balance -= amount;
          console.log(`✅ Retiro exitoso. Nuevo saldo: $${myAccount.balance}`);
        } else {
          console.log('❌ Fondos insuficientes.');
        }
      } else {
        console.log('⚠️ Monto numérico inválido.');
      }
    } else if (action === '4') {
      const targetAccount = prompt('Ingrese el número de cuenta destino: ');
      let accountFound = false;

      for (let i = 0; i < destinationAccounts.length; i++) {
        if (destinationAccounts[i].accountNum === targetAccount) {
          accountFound = true;
          break;
        }
      }

      if (accountFound) {
        const transferInput = prompt('Ingrese el monto a transferir: $');
        const transferAmount = Number(transferInput);
        const isValidTransfer = !isNaN(transferAmount) && transferAmount > 0 && transferAmount <= myAccount.balance;

        if (isValidTransfer) {
          myAccount.balance -= transferAmount;
          console.log(`✅ Transferencia de $${transferAmount} exitosa.`);
        } else {
          console.log('❌ Monto inválido o fondos insuficientes.');
        }
      } else {
        console.log('❌ Cuenta destino no encontrada.');
      }
    } else {
      console.log('⚠️ Opción no válida. Por favor seleccione un número del 1 al 5.');
    }
  }
};

runATM();
