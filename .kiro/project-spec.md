# Expense & Budget Visualizer

## Project Overview

Expense & Budget Visualizer is a web-based mini project created for the RevoU Coding Camp Software Engineering program.

The application helps users record expenses, organize transactions by category, monitor total spending, and visualize spending distribution using a pie chart.

The project will be built using HTML, CSS, and Vanilla JavaScript.

---

## Main Features

### 1. Add Transaction

Users can add a new expense by entering:

- Item Name
- Amount
- Category

Available categories:

- Food
- Transport
- Fun

The transaction will be added to the transaction list after the form is submitted.

---

### 2. Transaction List

The application displays all transactions entered by the user.

Each transaction should display:

- Item name
- Amount
- Category
- Delete button

Users can delete individual transactions.

---

### 3. Total Balance

The application automatically calculates the total amount of all recorded expenses.

The total must update whenever:

- A transaction is added
- A transaction is deleted

---

### 4. Expense Pie Chart

Display a pie chart that shows the proportion of expenses for each category:

- Food
- Transport
- Fun

The chart must automatically update whenever transaction data changes.

---

### 5. Local Storage

Transaction data must be stored using browser Local Storage.

Transactions should remain available after the browser is refreshed or reopened.

---

## Additional Challenges

The project will implement three additional challenges.

### Challenge 1 - Sort Transactions

Users can sort transactions based on available sorting options such as:

- Newest
- Oldest
- Highest amount
- Lowest amount

---

### Challenge 2 - Spending Limit

Users can set a spending limit.

The application should:

- Compare total expenses with the spending limit
- Highlight the total when spending approaches or exceeds the limit
- Display useful information about the remaining budget

---

### Challenge 3 - Light / Dark Mode

Users can switch between:

- Light Mode
- Dark Mode

The selected theme should be stored in Local Storage.

---

## Technical Requirements

The project must use:

- HTML
- CSS
- Vanilla JavaScript
- Browser Local Storage

The project should not require a backend.

The application must be responsive and usable on desktop and mobile devices.

---

## File Structure

Only one CSS file and one JavaScript file will be used.

```text
CodingCamp-31August26-AryaSuryaPratama/
│
├── .kiro/
│   └── project-spec.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
└── README.md