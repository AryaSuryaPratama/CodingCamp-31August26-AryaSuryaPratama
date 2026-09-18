# Expense & Budget Visualizer

Expense & Budget Visualizer is a simple and responsive web application for tracking daily expenses and managing a personal spending budget.

This project was created as part of the RevoU Coding Camp Software Engineering program.

## Features

### Core Features
- Add expense transactions
- Input item name, amount, and category
- Categories: Food, Transport, and Fun
- Automatic total expense calculation
- Transaction history
- Delete transactions
- Spending breakdown visualization
- Data persistence using Local Storage
- Responsive design for desktop and mobile

### Additional Challenges
This project implements three optional challenges:

1. Sort transactions by newest, oldest, highest amount, or lowest amount
2. Set a spending limit and highlight the budget status
3. Light and Dark Mode toggle

## Spending Visualization

Expenses are visualized using a dynamic donut chart based on:

- Food
- Transport
- Fun

The chart automatically updates whenever a transaction is added or deleted.

## Local Storage

The application uses the browser Local Storage API to save:

- Transactions
- Spending limit
- Selected theme

This allows data to remain available after refreshing or reopening the page.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- Local Storage API
- Git & GitHub
- GitHub Pages
- Kiro

## Project Structure

```text
CodingCamp-31August26-AryaSuryaPratama/
├── .kiro/
│   └── project-spec.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md