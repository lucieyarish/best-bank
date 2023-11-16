import { accounts } from './data.js';

const accountsList = document.getElementById('accounts-list');
const spendingsList = document.getElementById('spendings-list');

const renderTemplate = () => {
  for (let i = 0; i < accounts.length; i++) {
    const { id, title, balance, spendings } = accounts[i];

    let classes = 'account-item border-orange-dark text-bold text-25';
    if (id && id === 1) {
      classes += ' background-orange';
    }

    const html = `
    <li data-id="${id}" class="${classes}">
        <p>${title}</p>
        <p>$ ${balance}</p>
    </li>
  `;

    accountsList.innerHTML += html;

    renderSpendings(spendings);
  }
};

const renderSpendings = (spendings) => {
  for (let i = 0; i < spendings.length; i++) {
    const { category, spent } = spendings[i];
    const itemId = spendings[i];

    const html = `
        <li data-id="${itemId}" class="spending-item background-orange text-bold text-20">
            <p>${category}</p>
            <p>$ ${spent}</p>
        </li>
    `;

    spendingsList.innerHTML += html;
  }
};

renderTemplate();

document.addEventListener('click', function (event) {
  const clickedItem = event.target.closest('[data-id]');
  const clickedItemId = clickedItem.getAttribute('data-id');
  const allListItems = Array.from(accountsList.querySelectorAll('li'));
  const nonClickedItems = allListItems.filter(
    (li) => li.dataset.id !== clickedItemId
  );

  if (clickedItem && !clickedItem.classList.contains('background-orange')) {
    clickedItem.classList.add('background-orange');
    nonClickedItems.forEach((i) => i.classList.remove('background-orange'));
  }
});
