// Function to filter data by time range
export const filterByTimeRange = (data, range) => {
    const now = new Date();
    return data.filter((item) => {
      const date = new Date(item.date);
      if (range === "daily") {
        return date.toDateString() === now.toDateString();
      } else if (range === "weekly") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return date >= startOfWeek && date <= now;
      } else if (range === "monthly") {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }
      return true; // Default (all)
    });
  };
  
  // Function to generate CSV data
  export const generateCSV = (data) => {
    const csvRows = [];
    // Add headers
    csvRows.push("Date,Type,Amount,Category");
    // Add data rows
    data.forEach((item) => {
      csvRows.push(`${item.date},${item.type},${item.amount},${item.category}`);
    });
    return csvRows.join("\n");
  };
  
  // Function to download CSV file
  export const downloadCSV = (filename, csvData) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  