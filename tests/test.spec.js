import { egorPreset as test } from './src/config';
import {TEST_URL} from './src/config';

test.setTimeout(60000)


 test.beforeEach(async ({ page, person }) => {
  
  await page.goto( TEST_URL );
  await page.locator('text=По логину').click();
  await page.locator('[placeholder="Логин"]').click();
  await page.locator('[placeholder="Логин"]').fill( person.name );
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill( person.password );
  await page.locator('button:has-text("Войти")').click();
  
 });

 test('Создание шаблона', async ({ page }) => { 

  await page.getByText('Шаблоны').click();
  await page.getByRole('button', { name: 'Создать новый' }).click();
  await page.getByText('Коммунальные услуги').click();
  await page.getByText('ЕРКЦ - Оплата всех услуг').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('5118215');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByRole('button', { name: 'Создать шаблон' }).click();


 });

 test('Удаление шаблона', async ({ page }) => { 

  await page.getByText('Шаблоны').click();
  await page.locator('.popup-menu').first().click(); // падение
  await page.getByText('Удалить').first().click();
  await page.getByRole('button', { name: 'Да', exact: true }).click();
  await page.getByRole('button', { name: 'Ок' }).click();
  
 });

 test('Перевод между своими счетами', async ({ page }) => {
 
  await page.getByText('Перевести деньги').click();
  await page.getByText('Между своими счетами').click();
  await page.getByText('Выберите счет зачисления').click();
  await page.getByText('09896970001').click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('0,01');
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

});

test('Получение реквизитов', async ({ page, context }) => {
 
  await page.getByText('Счета', { exact: true }).click();
  await page.getByText('Счет виртуальной карты').first().click();
  await page.getByRole('link', { name: 'Реквизиты' }).click();
  const page1Promise = context.waitForEvent('page');
  await page.getByText('Реквизиты для перевода на счёт').click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  await page1.waitForTimeout(5000)
});

test('Выписка о доходах, расходах, имуществе и обязательствах', async ({ page, context }) => {
 
  await page.getByText('Еще').click();
  await page.getByText('Справки').click();
  await page.getByText('О доходах, расходах, имуществе и обязательствах').click();
  await page.getByText('Выберите').first().click();
  await page.getByText('2022').click();
  await page.getByText('Выберите').click();
  await page.getByText('01.03.2023').click();
  await page.getByRole('button', { name: 'Сформировать' }).click();
  const page1Promise = context.waitForEvent('page');
  await page.getByText(/^Справка о доходах, расходах, имуществе от [0-9a-z.-\s]*\.pdf$/).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  await page1.waitForTimeout(5000)
});

test('Оплата услуги - Теплофикация', async ({ page }) => {
 
  await page.getByText('Оплатить услуги').click();
  await page.getByText('Коммунальные услуги').click();
  await page.getByText('Трест Теплофикация').click();
  await page.getByText('Трест Теплофикация - Теплоснабжение', { exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('5118215');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.locator('amount-control').getByRole('textbox').click();
  await page.locator('amount-control').getByRole('textbox').fill('0,01');
  await page.getByRole('button', { name: 'Оплатить' }).click();
  await page.locator('multi-payment-confirmation').getByRole('button', { name: 'Оплатить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
});

test('Оплата мультиплатежа ГКС', async ({ page }) => {
 
  await page.getByText('Оплатить услуги').click();
  await page.getByPlaceholder('Введите название услуги или первые цифры номера карты/счёта получателя').click();
  await page.getByPlaceholder('Введите название услуги или первые цифры номера карты/счёта получателя').press('CapsLock');
  await page.getByPlaceholder('Введите название услуги или первые цифры номера карты/счёта получателя').fill('ГКС');
  await page.getByText('ГКС МКД - Оплата всех услуг').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('5505026');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.locator('sub-payment').filter({ hasText: 'Жилищные: 5505026-03₽ Удалить' }).getByPlaceholder('0,00').click();
  await page.locator('sub-payment').filter({ hasText: 'Жилищные: 5505026-03₽ Удалить' }).getByPlaceholder('0,00').fill('0,01');
  await page.locator('sub-payment').filter({ hasText: 'Капитальный ремонт: 5505026-04₽ Удалить' }).getByPlaceholder('0,00').click();
  await page.locator('sub-payment').filter({ hasText: 'Капитальный ремонт: 5505026-04₽ Удалить' }).getByPlaceholder('0,00').fill('0,01');
  await page.getByRole('button', { name: 'Оплатить' }).click();
  await page.locator('multi-payment-confirmation').getByRole('button', { name: 'Оплатить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  
});

test('Изменение Pin-кода', async ({ page }) => { 
  
  await page.getByText('Карты', { exact: true }).click();
  await page.getByText('Виртуальная карта МИРT').click();
  await page.getByRole('link', { name: 'Настройки' }).click();
  const changePin = page.getByText('Изменение PIN-кода');
  await changePin.click();
  await page.waitForTimeout(1000);
  const newPin = page.locator('ab-form-control-container').filter({ hasText: 'Новый PIN-код',  }).first().getByPlaceholder('_ _ _ _');
  await newPin.click();
  await newPin.fill('7777');
  const confirmPin = page.locator('ab-form-control-container').filter({ hasText: 'Повторите новый PIN-код' }).first().getByPlaceholder('_ _ _ _');
  await confirmPin.click();
  await confirmPin.fill('7777');
  await page.getByRole('button', { name: 'Сменить PIN-код' }).click();
  await page.getByRole('button', { name: 'Ок' }).click();
  
});

test('Пополнить счет', async ({ page }) => { 

  await page.getByText('Счета', { exact: true }).click();
  await page.getByText('Счет виртуальной карты 1').click();
  await page.locator('a').filter({ hasText: 'Пополнить' }).click();
  await page.getByText('Выберите источник средств').click();
  await page.getByText('Счет виртуальной карты 2').click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('0,01');
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

});

test('Проверка баннера', async ({ page }) => {

  await page.getByText('Карты', { exact: true }).click();
  await page.getByText('Виртуальная карта МИРT').click();
  await page.getByRole('link', { name: 'Настройки' }).click();
  await page.getByText('Закрытие или блокировка карты').click();
  await page.locator('switch-toggle-control-deployed').filter({ hasText: 'Временная блокировка картыСтатус карты изменится незамедлительно' }).locator('label').first().click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('ab-menu').getByText('Главная').click();
  await page.getByText('Карты', { exact: true }).click();
  await page.getByText('Виртуальная карта МИРT').click();
  await page.getByRole('link', { name: 'Настройки' }).click();
  await page.getByText('Закрытие или блокировка карты').click();
  await page.locator('switch-toggle-control-deployed').filter({ hasText: 'Временная блокировка картыСтатус карты изменится незамедлительно' }).locator('label').first().click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('ab-menu').getByText('Главная').click();

});