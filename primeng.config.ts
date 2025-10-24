import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

const SchoolPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.700}', // main text/buttons
          hoverColor: '{blue.600}',
          activeColor: '{blue.500}',
        },
        highlight: {
          background: '{green.100}', // selection, focused elements
          focusBackground: '{green.200}',
          color: '{green.800}',
          focusColor: '{green.900}',
        },
      },
      dark: {
        primary: {
          color: '{blue.200}', // main text/buttons in dark mode
          hoverColor: '{blue.300}',
          activeColor: '{blue.400}',
        },
        highlight: {
          background: 'rgba(72, 187, 120, 0.2)', // soft green highlight
          focusBackground: 'rgba(72, 187, 120, 0.3)',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
    },
  },
});

export const primengProvider = providePrimeNG({
  theme: {
    preset: SchoolPreset,
  },
});
