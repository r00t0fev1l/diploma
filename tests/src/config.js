import { test as base } from '@playwright/test';

export const TEST_URL = 'https://direct.creditural.ru/';
// export const TEMPLATE_ERKC = "ЕРКЦ - Оплата всех услуг";

export const egorPreset = base.extend({
    // Define an option and provide a default value.
    // We can later override it in the config.
    person: {name: '1460001461643321', password: '1234'},
  });

// export const testUserPreset = base.extend({
//     // Define an option and provide a default value.
//     // We can later override it in the config.
//     person: {name: 'test', password: '1234'},
//   });
