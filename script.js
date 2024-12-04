// DOM Elements
const budgetNameInput = document.getElementById('budget-name');
const budgetCategoriesDiv = document.getElementById('budget-categories');
const budgetMessage = document.getElementById('budget-message');
const addCategoryBtn = document.getElementById('add-category-btn');
const setBudgetBtn = document.getElementById('set-budget-btn');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseInput = document.getElementById('expense-input');
const addExpenseBtn = document.getElementById('add-expense-btn');
const budgetTableBody = document.querySelector('#budget-table tbody');

// Data Storage
let budgets = {};
let expenses = {};

// Save budgets and expenses to localStorage
function saveToLocalStorage() {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add New Budget Category
addCategoryBtn.addEventListener('click', () => {
    const newCategory = prompt("Enter a new budget category:");
    if (newCategory && !budgets[newCategory]) {
        budgets[newCategory] = 0;
        expenses[newCategory] = 0;
        const div = document.createElement('div');
        div.innerHTML = `
            <label>${newCategory}:</label>
            <input type="number" id="${newCategory}-budget" placeholder="Enter budget for ${newCategory}" min="0" required />
        `;
        budgetCategoriesDiv.appendChild(div);
        const option = document.createElement('option');
        option.value = newCategory;
        option.textContent = newCategory;
        expenseCategorySelect.appendChild(option);

        // Save to localStorage
        saveToLocalStorage();
    } else if (budgets[newCategory]) {
        alert("Category already exists.");
    }
});

// Set Budgets
setBudgetBtn.addEventListener('click', () => {
    const budgetName = budgetNameInput.value.trim();
    if (!budgetName) {
        alert("Please enter a budget name.");
        return;
    }

    Object.keys(budgets).forEach((category) => {
        const input = document.getElementById(`${category}-budget`);
        if (input) {
            budgets[category] = parseFloat(input.value) || 0;
        }
    });

    budgetMessage.textContent = `Budget "${budgetName}" has been set successfully!`;

    // Save to localStorage
    saveToLocalStorage();

    updateTable();
});

// Add Expense
addExpenseBtn.addEventListener('click', () => {
    const category = expenseCategorySelect.value;
    const amount = parseFloat(expenseInput.value);

    if (category && amount > 0) {
        expenses[category] = (expenses[category] || 0) + amount;

        // Save to localStorage
        saveToLocalStorage();

        updateTable();
    }
});


// Update Table
function updateTable() {
    budgetTableBody.innerHTML = '';
    Object.keys(budgets).forEach((category) => {
        const budget = budgets[category];
        const spent = expenses[category];
        const status = spent <= budget ? "Within Budget" : "Over Budget";

        const row = `
            <tr>
                <td>${category}</td>
                <td>$${budget.toFixed(2)}</td>
                <td>$${spent.toFixed(2)}</td>
                <td>${status}</td>
            </tr>
        `;
        budgetTableBody.innerHTML += row;
    });
}
