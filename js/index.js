import { accounts } from './data.js';

const accountsList = document.getElementById('accounts-list');
const spendingsList = document.getElementById('spendings-list');

let activeAccountId = 1;

const renderTemplate = () => {
  for (let i = 0; i < accounts.length; i++) {
    const { id, title, balance } = accounts[i];

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

    if (id === activeAccountId) {
      const spendings = accounts.find(
        (a) => a.id === activeAccountId
      ).spendings;
      renderSpendings(spendings);
    }
  }
};

const renderSpendings = (spendings) => {
  const allSpendings = spendings.map((s) => s.spent);
  const maxSpentVal = Math.max(...allSpendings);

  for (let i = 0; i < spendings.length; i++) {
    const { category, spent } = spendings[i];
    const itemId = i + 1;

    const itemWidth = calculateWidth(spent, maxSpentVal);

    const html = `
        <li id="${itemId}" style="${itemWidth}" class="spending-item background-orange text-bold text-20">
            <p>${category}</p>
            <p>$ ${spent}</p>
        </li>
    `;

    spendingsList.innerHTML += html;
  }
};

const calculateWidth = (spent, maxSpentVal) => {
  let styles;

  const maxWidth = 500;
  const minWidth = 250;
  //added 250 to each width in order to make difference in amounts more obvious
  const itemWidth = (spent * maxWidth) / maxSpentVal + 250;

  if (itemWidth > minWidth && itemWidth < maxWidth) {
    styles = 'width: ' + itemWidth + 'px;';
  } else if (itemWidth > maxWidth) {
    styles = 'width: ' + maxWidth + 'px;';
  } else {
    styles = 'width: ' + minWidth + 'px;';
  }

  return styles;
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
    activeAccountId = clickedItemId;
    nonClickedItems.forEach((i) => i.classList.remove('background-orange'));
  }
});
