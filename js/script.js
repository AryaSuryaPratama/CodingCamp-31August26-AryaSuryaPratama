/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEYS = {
  transactions: "expenseVisualizer.transactions",
  spendingLimit: "expenseVisualizer.spendingLimit",
  theme: "expenseVisualizer.theme",
};


/* =========================
   STATE
========================= */

const state = {
  transactions: readStorage(
    STORAGE_KEYS.transactions,
    []
  ),

  spendingLimit:
    Number(
      localStorage.getItem(
        STORAGE_KEYS.spendingLimit
      )
    ) || 0,

  theme:
    localStorage.getItem(
      STORAGE_KEYS.theme
    ) || "light",

  sortBy: "newest",
};


/* =========================
   ELEMENTS
========================= */

const elements = {
  themeToggle:
    document.getElementById(
      "themeToggle"
    ),

  totalExpense:
    document.getElementById(
      "totalExpense"
    ),

  spendingLimitDisplay:
    document.getElementById(
      "spendingLimitDisplay"
    ),

  remainingBudget:
    document.getElementById(
      "remainingBudget"
    ),

  budgetStatus:
    document.getElementById(
      "budgetStatus"
    ),

  remainingCard:
    document.getElementById(
      "remainingCard"
    ),

  limitForm:
    document.getElementById(
      "limitForm"
    ),

  limitInput:
    document.getElementById(
      "limitInput"
    ),

  transactionForm:
    document.getElementById(
      "transactionForm"
    ),

  itemName:
    document.getElementById(
      "itemName"
    ),

  amount:
    document.getElementById(
      "amount"
    ),

  category:
    document.getElementById(
      "category"
    ),

  formMessage:
    document.getElementById(
      "formMessage"
    ),

  transactionList:
    document.getElementById(
      "transactionList"
    ),

  emptyTransactionState:
    document.getElementById(
      "emptyTransactionState"
    ),

  transactionCounter:
    document.getElementById(
      "transactionCounter"
    ),

  sortTransactions:
    document.getElementById(
      "sortTransactions"
    ),

  expenseChart:
    document.getElementById(
      "expenseChart"
    ),

  chartEmptyState:
    document.getElementById(
      "chartEmptyState"
    ),

  foodTotal:
    document.getElementById(
      "foodTotal"
    ),

  transportTotal:
    document.getElementById(
      "transportTotal"
    ),

  funTotal:
    document.getElementById(
      "funTotal"
    ),
};


/* =========================
   LOCAL STORAGE
========================= */

function readStorage(key, fallback) {
  try {
    const value =
      JSON.parse(
        localStorage.getItem(key)
      );

    return value ?? fallback;
  } catch {
    return fallback;
  }
}


function saveTransactions() {
  localStorage.setItem(
    STORAGE_KEYS.transactions,
    JSON.stringify(
      state.transactions
    )
  );
}


/* =========================
   FORMAT CURRENCY
========================= */

function formatCurrency(amount) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {
  const date =
    new Date(dateString);

  return date.toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Jakarta",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}


/* =========================
   ID GENERATOR
========================= */

function createId() {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString() +
    Math.random()
      .toString(16)
      .slice(2)
  );
}


/* =========================
   CALCULATIONS
========================= */

function getTotalExpense() {
  return state.transactions.reduce(
    (total, transaction) =>
      total + transaction.amount,
    0
  );
}


function getCategoryTotals() {
  const totals = {
    Food: 0,
    Transport: 0,
    Fun: 0,
  };

  state.transactions.forEach(
    (transaction) => {
      if (
        Object.prototype.hasOwnProperty.call(
          totals,
          transaction.category
        )
      ) {
        totals[
          transaction.category
        ] += transaction.amount;
      }
    }
  );

  return totals;
}


/* =========================
   SUMMARY
========================= */

function renderSummary() {
  const total =
    getTotalExpense();

  elements.totalExpense.textContent =
    formatCurrency(total);


  if (state.spendingLimit > 0) {
    elements.spendingLimitDisplay
      .textContent =
      formatCurrency(
        state.spendingLimit
      );

    const remaining =
      state.spendingLimit -
      total;

    elements.remainingBudget
      .textContent =
      formatCurrency(remaining);

    elements.remainingCard
      .classList.remove(
        "success",
        "warning",
        "danger"
      );


    const percentage =
      (
        total /
        state.spendingLimit
      ) * 100;


    if (total > state.spendingLimit) {
      elements.remainingCard
        .classList.add(
          "danger"
        );

      elements.budgetStatus
        .textContent =
        `Budget exceeded by ${formatCurrency(
          Math.abs(remaining)
        )}.`;

    } else if (percentage >= 80) {
      elements.remainingCard
        .classList.add(
          "warning"
        );

      elements.budgetStatus
        .textContent =
        "Careful, you are close to your spending limit.";

    } else {
      elements.remainingCard
        .classList.add(
          "success"
        );

      elements.budgetStatus
        .textContent =
        "Your spending is still within budget.";
    }

  } else {
    elements.spendingLimitDisplay
      .textContent =
      "Not set";

    elements.remainingBudget
      .textContent =
      "-";

    elements.budgetStatus
      .textContent =
      "Set a spending limit to start.";

    elements.remainingCard
      .classList.remove(
        "success",
        "warning",
        "danger"
      );
  }
}


/* =========================
   CATEGORY SUMMARY
========================= */

function renderCategorySummary() {
  const totals =
    getCategoryTotals();

  elements.foodTotal.textContent =
    formatCurrency(
      totals.Food
    );

  elements.transportTotal
    .textContent =
    formatCurrency(
      totals.Transport
    );

  elements.funTotal.textContent =
    formatCurrency(
      totals.Fun
    );
}


/* =========================
   SORT TRANSACTIONS
========================= */

function getSortedTransactions() {
  const transactions =
    [...state.transactions];

  switch (state.sortBy) {
    case "oldest":
      return transactions.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );

    case "highest":
      return transactions.sort(
        (a, b) =>
          b.amount - a.amount
      );

    case "lowest":
      return transactions.sort(
        (a, b) =>
          a.amount - b.amount
      );

    case "newest":
    default:
      return transactions.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
  }
}


/* =========================
   TRANSACTION LIST
========================= */

function renderTransactions() {
  elements.transactionList
    .innerHTML = "";

  const transactions =
    getSortedTransactions();


  transactions.forEach(
    (transaction) => {

      const item =
        document.createElement(
          "article"
        );

      item.className =
        "transaction-item";


      const main =
        document.createElement(
          "div"
        );

      main.className =
        "transaction-main";


      const title =
        document.createElement(
          "h3"
        );

      title.textContent =
        transaction.name;


      const date =
        document.createElement(
          "p"
        );

      date.className =
        "transaction-date";

      date.textContent =
        formatDate(
          transaction.createdAt
        );


      main.append(
        title,
        date
      );


      const category =
        document.createElement(
          "span"
        );

      category.className =
        `transaction-category ${transaction.category.toLowerCase()}`;

      category.textContent =
        transaction.category;


      const amount =
        document.createElement(
          "strong"
        );

      amount.className =
        "transaction-amount";

      amount.textContent =
        formatCurrency(
          transaction.amount
        );


      const deleteButton =
        document.createElement(
          "button"
        );

      deleteButton.type =
        "button";

      deleteButton.className =
        "delete-button";

      deleteButton.textContent =
        "Delete";

      deleteButton.setAttribute(
        "aria-label",
        `Delete ${transaction.name}`
      );


      deleteButton.addEventListener(
        "click",
        () => {
          deleteTransaction(
            transaction.id
          );
        }
      );


      item.append(
        main,
        category,
        amount,
        deleteButton
      );


      elements.transactionList
        .appendChild(item);
    }
  );


  const count =
    state.transactions.length;

  elements.transactionCounter
    .textContent =
    `${count} ${
      count === 1
        ? "transaction"
        : "transactions"
    }`;


  elements.emptyTransactionState
    .classList.toggle(
      "hidden",
      count > 0
    );
}


/* =========================
   ADD TRANSACTION
========================= */

function addTransaction(
  name,
  amount,
  category
) {
  const cleanName =
    name.trim();

  const cleanAmount =
    Number(amount);

  const allowedCategories = [
    "Food",
    "Transport",
    "Fun",
  ];


  if (!cleanName) {
    elements.formMessage
      .textContent =
      "Please enter an item name.";

    return false;
  }


  if (
    !Number.isFinite(
      cleanAmount
    ) ||
    cleanAmount <= 0
  ) {
    elements.formMessage
      .textContent =
      "Please enter a valid amount.";

    return false;
  }


  if (
    !allowedCategories.includes(
      category
    )
  ) {
    elements.formMessage
      .textContent =
      "Please select a category.";

    return false;
  }


  const transaction = {
    id: createId(),
    name: cleanName,
    amount: cleanAmount,
    category,
    createdAt:
      new Date().toISOString(),
  };


  state.transactions.push(
    transaction
  );


  saveTransactions();

  elements.formMessage
    .textContent = "";

  renderApp();

  return true;
}


/* =========================
   DELETE TRANSACTION
========================= */

function deleteTransaction(id) {
  state.transactions =
    state.transactions.filter(
      (transaction) =>
        transaction.id !== id
    );

  saveTransactions();

  renderApp();
}


/* =========================
   PIE CHART
========================= */

function drawPieChart() {
  const canvas =
    elements.expenseChart;

  const context =
    canvas.getContext("2d");

  const totals =
    getCategoryTotals();

  const data = [
    totals.Food,
    totals.Transport,
    totals.Fun,
  ];

  const total =
    data.reduce(
      (sum, value) =>
        sum + value,
      0
    );


  const styles =
    getComputedStyle(
      document.documentElement
    );

  const colors = [
    styles
      .getPropertyValue(
        "--food"
      )
      .trim(),

    styles
      .getPropertyValue(
        "--transport"
      )
      .trim(),

    styles
      .getPropertyValue(
        "--fun"
      )
      .trim(),
  ];


  const size = 300;

  canvas.width = size;
  canvas.height = size;


  context.clearRect(
    0,
    0,
    size,
    size
  );


  if (total <= 0) {
    canvas.classList.add(
      "hidden"
    );

    elements.chartEmptyState
      .classList.remove(
        "hidden"
      );

    return;
  }


  canvas.classList.remove(
    "hidden"
  );

  elements.chartEmptyState
    .classList.add(
      "hidden"
    );


  const centerX =
    size / 2;

  const centerY =
    size / 2;

  const radius =
    size * 0.42;

  let startAngle =
    -Math.PI / 2;


  data.forEach(
    (value, index) => {

      if (value <= 0) {
        return;
      }


      const sliceAngle =
        (
          value /
          total
        ) *
        Math.PI *
        2;


      context.beginPath();

      context.moveTo(
        centerX,
        centerY
      );

      context.arc(
        centerX,
        centerY,
        radius,
        startAngle,
        startAngle +
          sliceAngle
      );

      context.closePath();

      context.fillStyle =
        colors[index];

      context.fill();


      startAngle +=
        sliceAngle;
    }
  );


  /* DONUT CENTER */

  const bodyStyles =
    getComputedStyle(
      document.body
    );

  const surfaceColor =
    bodyStyles
      .getPropertyValue(
        "--surface"
      )
      .trim();


  context.beginPath();

  context.arc(
    centerX,
    centerY,
    radius * 0.56,
    0,
    Math.PI * 2
  );

  context.fillStyle =
    surfaceColor ||
    "#ffffff";

  context.fill();


  /* CENTER TEXT */

  context.fillStyle =
    bodyStyles
      .getPropertyValue(
        "--muted"
      )
      .trim();

  context.textAlign =
    "center";

  context.textBaseline =
    "middle";

  context.font =
    "500 13px Inter, sans-serif";

  context.fillText(
    "TOTAL",
    centerX,
    centerY - 12
  );


  context.fillStyle =
    bodyStyles
      .getPropertyValue(
        "--text"
      )
      .trim();

  context.font =
    "700 16px Inter, sans-serif";


  const compactTotal =
    new Intl.NumberFormat(
      "id-ID",
      {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }
    ).format(total);


  context.fillText(
    `Rp${compactTotal}`,
    centerX,
    centerY + 13
  );
}


/* =========================
   SPENDING LIMIT
========================= */

function setSpendingLimit(
  value
) {
  const limit =
    Number(value);


  if (
    !Number.isFinite(limit) ||
    limit <= 0
  ) {
    return false;
  }


  state.spendingLimit =
    limit;


  localStorage.setItem(
    STORAGE_KEYS.spendingLimit,
    String(limit)
  );


  renderSummary();

  return true;
}


/* =========================
   THEME
========================= */

function applyTheme() {
  const isDark =
    state.theme === "dark";


  document.body.classList.toggle(
    "dark",
    isDark
  );


  elements.themeToggle
    .textContent =
    isDark
      ? "☀️"
      : "🌙";


  elements.themeToggle
    .setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


  /*
    Redraw the canvas so its
    center follows theme colors.
  */

  drawPieChart();
}


function toggleTheme() {
  state.theme =
    state.theme === "dark"
      ? "light"
      : "dark";


  localStorage.setItem(
    STORAGE_KEYS.theme,
    state.theme
  );


  applyTheme();
}


/* =========================
   RENDER APP
========================= */

function renderApp() {
  renderSummary();

  renderCategorySummary();

  renderTransactions();

  drawPieChart();
}


/* =========================
   TRANSACTION FORM EVENT
========================= */

elements.transactionForm
  .addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const added =
        addTransaction(
          elements.itemName.value,
          elements.amount.value,
          elements.category.value
        );


      if (added) {
        elements.transactionForm
          .reset();

        elements.itemName
          .focus();
      }
    }
  );


/* =========================
   LIMIT FORM EVENT
========================= */

elements.limitForm
  .addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const success =
        setSpendingLimit(
          elements.limitInput.value
        );


      if (success) {
        elements.limitInput
          .value = "";
      }
    }
  );


/* =========================
   SORT EVENT
========================= */

elements.sortTransactions
  .addEventListener(
    "change",
    (event) => {

      state.sortBy =
        event.target.value;

      renderTransactions();
    }
  );


/* =========================
   THEME EVENT
========================= */

elements.themeToggle
  .addEventListener(
    "click",
    toggleTheme
  );


/* =========================
   INITIAL LOAD
========================= */

elements.sortTransactions
  .value =
  state.sortBy;

applyTheme();

renderApp();