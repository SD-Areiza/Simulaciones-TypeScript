# Simulaciones TS

Proyecto de simulaciones en TypeScript con ejemplos interactivos basados en consola.

Archivos incluidos:

- `cajero.ts`
- `Digiturno.ts`
- `hoteles.ts`
- `VentaBoletos.ts`
- `lavadoras.ts`

## Requisitos

- Node.js
- npm

## Instalación

Desde la carpeta del proyecto:

```bash
npm install
```

## Compilar

```bash
npm run build
```

## Ejecutar cada simulación

```bash
npm run start:cajero
npm run start:digiturno
npm run start:hoteles
npm run start:venta-boletos
```

> Si necesitas ejecutar `lavadoras.ts` directamente, usa `npx ts-node lavadoras.ts`.

## Notas

- Cada archivo usa `prompt-sync` para leer entradas desde la consola.
- `ts-node` permite ejecutar archivos `.ts` sin compilarlos manualmente.
- Los programas son interactivos y funcionan desde la terminal.
