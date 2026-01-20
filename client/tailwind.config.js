/** @type {import('tailwindcss').Config} */

import PrimeUI from 'tailwindcss-primeui';

export const content = [
  "./src/**/*.{html,ts}",
  './node_modules/@ilhombek/lib/base-form/**/*.{html,js,mjs}'
];

export const theme = {
  extend: {},
};
export const plugins = [PrimeUI];
