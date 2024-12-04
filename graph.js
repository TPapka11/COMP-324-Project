// Retrieve budgets and expenses from localStorage
const budgets = JSON.parse(localStorage.getItem('budgets')) || {};
const expenses = JSON.parse(localStorage.getItem('expenses')) || {};

// Prepare data for the graph
const categories = Object.keys(budgets);
const budgetValues = categories.map(category => budgets[category]);
const expenseValues = categories.map(category => expenses[category] || 0);

// Check if there's data to display
if (categories.length === 0) {
    document.querySelector('.container').innerHTML = `
        <h2>No budget or expense data available.</h2>
        <a href="index.html" class="btn">Back to Main Page</a>
    `;
} else {
    // Create a bar chart with Chart.js
    const ctx = document.getElementById('budget-expense-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Budget',
                    data: budgetValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Expenses',
                    data: expenseValues,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
                    },
                },
                legend: {
                    labels: {
                        color: '#ffffff', // Header text color
                        font: {
                            size: 14,
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff', // X-axis labels color
                        font: {
                            size: 12,
                        },
                    },
                    title: {
                        display: true,
                        text: 'Categories',
                        color: '#ffffff', // X-axis title color
                        font: {
                            size: 14,
                        },
                    },
                },
                y: {
                    ticks: {
                        color: '#ffffff', // Y-axis labels color
                        font: {
                            size: 12,
                        },
                    },
                    title: {
                        display: true,
                        text: 'Amount ($)',
                        color: '#ffffff', // Y-axis title color
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        },
    });
}
