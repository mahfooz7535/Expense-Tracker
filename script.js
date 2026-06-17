const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

const expenseList = document.getElementById("expenseList");
const totalElement = document.getElementById("total");

let expenses = [];
let editId = null;

addBtn.addEventListener("click", addExpense);
clearBtn.addEventListener("click", clearAllExpenses);
titleInput.addEventListener("keydown", handleEnter);
amountInput.addEventListener("keydown", handleEnter);

function handleEnter(event) {
  if (event.key === "Enter") {
    addExpense();
  }
}

function addExpense() {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) {
    alert("Please enter valid data");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount,
  };

  if (editId) {
    expenses = expenses.map((expense) =>
      expense.id === editId
        ? {
            ...expense,
            title,
            amount,
          }
        : expense,
    );

    editId = null;

    addBtn.textContent = "Add Expense";
  } else {
    expenses.push(expense);
  }

  saveToLocalStorage();

  displayExpenses();

  titleInput.value = "";
  amountInput.value = "";
}

function displayExpenses() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;

    const li = document.createElement("li");

    li.classList.add("expense-item");

    li.innerHTML = `
      <span>
        ${expense.title} - ₹${expense.amount}
      </span>

      <div>
      <button class="edit-btn"
      onclick="editExpense(${expense.id})">
      Edit
      </button>

      <button
        class="delete-btn"
        onclick="deleteExpense(${expense.id})"
      >
        Delete
      </button>
      </div>
    `;

    expenseList.appendChild(li);
  });

  totalElement.textContent = `₹${total}`;
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);

  saveToLocalStorage();

  displayExpenses();
}

function editExpense(id) {
  const expense = expenses.find((expense) => expense.id === id);

  titleInput.value = expense.title;
  amountInput.value = expense.amount;

  editId = id;

  addBtn.textContent = "Update Expense";
  titleInput.focus();
}

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  console.log("loadExpenses running");

  const storedExpenses = localStorage.getItem("expenses");

  console.log(storedExpenses);

  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);

    displayExpenses();
  }
}

loadExpenses();

function clearAllExpenses() {
  //   const isConfirmed = confirm("Are you sure you want to delete all expenses?");

  //   if (!isConfirmed) {
  //     return;
  //   }
  console.log("Button Clicked");

  expenses = [];

  saveToLocalStorage();

  displayExpenses();
}
