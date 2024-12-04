import { isPremium, expenses } from "./data.js";

// Function to filter expenses based on the selected time range
const filterExpenses = (range) => {
  const now = new Date();
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (range === "daily") {
      return expenseDate.toDateString() === now.toDateString();
    }
    if (range === "weekly") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return expenseDate >= startOfWeek && expenseDate <= now;
    }
    if (range === "monthly") {
      return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    }
    return true; // Default to showing all expenses
  });
};

// Function to generate CSV from the expenses array
const generateCSV = (data) => {
  const csvRows = [];
  csvRows.push("Date,Type,Amount,Category");
  data.forEach((item) => {
    csvRows.push(`${item.date},${item.type},${item.amount},${item.category}`);
  });
  return csvRows.join("\n");
};

// Function to trigger the download of a CSV file
const downloadCSV = (filename, csvData) => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Function to populate the expense table
const populateTable = (filteredExpenses) => {
  const tableBody = document.getElementById("expenseTable");
  tableBody.innerHTML = ""; // Clear any existing rows
  filteredExpenses.forEach((expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.type}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Initialize the app
const initializeApp = () => {
  let filteredExpenses = expenses;

  // Initially populate the table with all data
  populateTable(filteredExpenses);

  // Handle time range filter changes
  const timeRange = document.getElementById("timeRange");
  timeRange.addEventListener("change", () => {
    const range = timeRange.value;
    filteredExpenses = filterExpenses(range);
    populateTable(filteredExpenses);
  });

  // Handle the download button for premium users
  const downloadButton = document.getElementById("downloadButton");
  if (isPremium) {
    downloadButton.disabled = false;
    downloadButton.addEventListener("click", () => {
      const csvData = generateCSV(filteredExpenses);
      downloadCSV("expenses.csv", csvData);
    });
  } else {
    downloadButton.disabled = true;
  }
};

// Run the app
initializeApp();




// import { isPremium, expenses } from "./data.js";
// import { filterByTimeRange, generateCSV, downloadCSV } from "./utils.js";

// // Function to populate the expense table
// const populateTable = (filteredData) => {
//   const tableBody = document.getElementById("expenseTable");
//   tableBody.innerHTML = ""; // Clear previous rows
//   filteredData.forEach((expense) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${expense.date}</td>
//       <td>${expense.type}</td>
//       <td>${expense.amount}</td>
//       <td>${expense.category}</td>
//     `;
//     tableBody.appendChild(row);
//   });
// };

// // Initialize the app
// const initializeApp = () => {
//   // Default data (all expenses)
//   let filteredData = expenses;

//   // Populate the table initially
//   populateTable(filteredData);

//   // Handle time range filter
//   const timeRange = document.getElementById("timeRange");
//   timeRange.addEventListener("change", () => {
//     const range = timeRange.value;
//     filteredData = filterByTimeRange(expenses, range);
//     populateTable(filteredData);
//   });

//   // Handle download button
//   const downloadButton = document.getElementById("downloadButton");
//   if (isPremium) {
//     downloadButton.disabled = false; // Enable for premium users
//     downloadButton.addEventListener("click", () => {
//       const csvData = generateCSV(filteredData);
//       downloadCSV("expenses.csv", csvData);
//     });
//   } else {
//     downloadButton.disabled = true; // Keep disabled for non-premium users
//     downloadButton.title = "Available only for premium users";
//   }
// };

// // Run the app
// initializeApp();
