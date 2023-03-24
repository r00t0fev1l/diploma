import { expect } from '@playwright/test';
import { egorPreset as test } from './src/config';
import {TEST_URL} from './src/config';

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
  await page.waitForTimeout(2000);
 });

 test('Удаление шаблона', async ({ page }) => { 

  await page.getByText('Шаблоны').click();
  await page.locator('.popup-menu').first().click(); 
  await page.getByText('Удалить').first().click();
  await page.getByRole('button', { name: 'Да', exact: true }).click();
  await page.getByRole('button', { name: 'Ок' }).click();
  await page.waitForTimeout(2000);
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
  await page.waitForTimeout(2000);
});

test('Перевод по лицевому счету внутри банка', async ({ page }) => {

  await page.getByText('Перевести деньги').click();
  await page.getByText('Клиенту Банка "КУБ" (АО)').click();
  await page.getByRole('link', { name: 'По номеру счёта' }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('09882405401');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('0,01');
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  await page.waitForTimeout(2000);
});  

test('Перевод на карту внутри банка', async ({ page }) => {

  await page.getByText('Перевести деньги').click();
  await page.getByText('Клиенту Банка "КУБ" (АО)').click();
  await page.locator('text-control').getByRole('textbox').click();
  await page.locator('text-control').getByRole('textbox').fill('2200 5602 2179 0774');
  await page.locator('amount-control').getByRole('textbox').click();
  await page.locator('amount-control').getByRole('textbox').fill('0,01');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  await page.waitForTimeout(2000);
});

test('Перевод СБП внутри банка', async ({ page }) => {

  await page.getByText('Перевести деньги').click();
  await page.getByText('По номеру телефона').click();
  await page.getByRole('button', { name: 'По номеру телефона' }).click();
  await page.getByPlaceholder('+X (XXX) XXX-XX-XX').fill('+7 (909) 092-82-20');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('0,01');
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  await page.waitForTimeout(2000);
});

test('Перевод по реквизитам', async ({ page, context }) => {

  await page.getByText('Перевести деньги').click();
  await page.getByText('Перевод по реквизитам').click();
  await page.getByRole('button', { name: 'По реквизитам' }).click();
  await page.getByPlaceholder('Введите БИК или банк получателя').click();
  await page.keyboard.type('047516949', {delay: 500});
  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('Введите номер счета').click();
  await page.getByPlaceholder('Введите номер счета').fill('40817 810 8 3028 2405401');
  await page.getByPlaceholder('Введите сумму').click();
  await page.getByPlaceholder('Введите сумму').fill('10');
  await page.getByRole('button', { name: 'Перевести' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click(); 
  const modal = page.locator('.modal.ng-trigger.ng-trigger-fadeInOut');
  await modal.waitFor({state:'visible'});
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  await page.waitForTimeout(2000);
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

test('Справка об уплаченных процентах по ипотечному кредиту - в случае если у клиента отсутствуют данные договоры', async ({ page, context }) => {

  await page.getByText('Еще').click();
  await page.getByText('Справки').click();
  await page.getByText('Об уплаченных процентах по ипотечному кредиту').click();
  await page.getByRole('button', { name: 'Ок' }).click();
  await page.locator('ab-menu').getByText('Главная').click();
  await page.waitForTimeout(2000);

});  

test('Справка об отсутствии задолженности-кредитные договоры были ранее', async ({ page, context }) => {

  await page.getByText('Еще').click();
  await page.getByText('Справки').click();
  await page.getByText('Об отсутствии задолженности').click();
  const page1Promise = context.waitForEvent('page');
  await page.getByText(/^Справка об отсутствии задолженности от [0-9a-z.-\s]*\.pdf$/).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  await page1.waitForTimeout(5000)

});  

test('Расчетный листок - клиент у которого табулька передается', async ({ page }) => {

  await page.getByText('Еще').click();
  await page.getByText('Расчетный листок').click();
  await page.getByRole('button', { name: 'Сформировать' }).click(); 
  (await page.waitForSelector(".pay-slip-page__link-download", {state:'visible'})).click();
  await page.waitForTimeout(5000);
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
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Оплатить' }).click();
  await page.locator('multi-payment-confirmation').getByRole('button', { name: 'Оплатить' }).click();
  await page.getByRole('button', { name: 'Вернуться на главную страницу' }).click();
  await page.waitForTimeout(2000);
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
  await page.waitForTimeout(2000);
  
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
  await page.waitForTimeout(2000);
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
  await page.waitForTimeout(2000);
});

test('Блокировка и разблокировка карты', async ({ page }) => { 

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
  await page.waitForTimeout(2000);
});
