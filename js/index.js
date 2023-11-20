import { accounts } from './data/accounts.js';

const accountsList = document.getElementById('accounts-list');
const spendingsList = document.getElementById('spendings-list');
let activeAccountId = 1;

// TEMPLATE RENDERING FUNCTIONS
const renderTemplate = () => {
  for (let i = 0; i < accounts.length; i++) {
    const { id, title, balance } = accounts[i];
    renderAccount(id, title, balance);

    if (id === activeAccountId) {
      const spendings = accounts.find(
        (a) => a.id === activeAccountId
      ).spendings;
      renderSpendings(spendings);
    }
  }
};

const renderAccount = (id, title, balance) => {
  const commaSeparatedBalance = addThousandsSeparator(balance);

  let classes = 'account-item border-blue-dark text-bold text-25';
  if (id && id === 1) {
    classes += ' background-blue-dark text-white';
  }

  const html = `
          <li data-id="${id}" class="${classes}">
              <p>${title}</p>
              <p>$ ${commaSeparatedBalance}</p>
          </li>
      `;

  accountsList.innerHTML += html;
};

const renderSpendings = (spendings) => {
  clearLoadedSpendings();
  const allSpendings = spendings.map((s) => s.spent);
  const maxSpentVal = Math.max(...allSpendings);

  if (spendings.length === 0 || spendings === null) {
    const infoMessage = renderInfoMessage();
    spendingsList.innerHTML += infoMessage;
  }

  for (let i = 0; i < spendings.length; i++) {
    const { category, spent } = spendings[i];
    const itemId = i + 1;
    const itemWidth = calculateWidth(spent, maxSpentVal);
    const commaSeparatedSpent = addThousandsSeparator(spent);

    const html = `
            <li id="${itemId}" style="${itemWidth}" class="spending-item background-blue-light text-bold text-20">
                <p>${category}</p>
                <p>$ ${commaSeparatedSpent}</p>
            </li>
        `;

    spendingsList.innerHTML += html;
  }
};

const renderCurrentAccountSpendings = () => {
  const account = accounts.find((x) => x.id === activeAccountId);
  const spendings = account.spendings;
  renderSpendings(spendings);
};

const renderInfoMessage = () => {
  const html = `
        <p class="text-bold text-20">You haven't spent anything yet!</p>
    `;

  return html;
};

// HELPER FUCTIONS
const addThousandsSeparator = (amountSpent) => {
  let convertedAmount = parseFloat(amountSpent);
  let commaSeparatedAmount = convertedAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return commaSeparatedAmount;
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

const clearLoadedSpendings = () => {
  spendingsList.innerHTML = '';
};

// FUNCTION CALLS
renderTemplate();

// EVENT LISTENERS
document.addEventListener('click', function (event) {
  const clickedItem = event.target.closest('[data-id]');
  let clickedItemId;
  if (clickedItem) {
    clickedItemId = clickedItem.getAttribute('data-id');
  }
  activeAccountId = +clickedItemId;
  const allListItems = Array.from(accountsList.querySelectorAll('li'));
  const nonClickedItems = allListItems.filter(
    (li) => li.dataset.id !== clickedItemId
  );

  if (
    clickedItem &&
    !clickedItem.classList.contains('background-blue-dark') &&
    !clickedItem.classList.contains('text-white')
  ) {
    clickedItem.classList.add('background-blue-dark');
    clickedItem.classList.add('text-white');
    renderCurrentAccountSpendings();
    nonClickedItems.forEach(function (i) {
      i.classList.remove('background-blue-dark');
      i.classList.remove('text-white');
    });
  }
});
