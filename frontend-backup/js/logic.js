document
  .getElementById("ceremonyForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Show loading message
    document.getElementById("loading").classList.remove("hidden");

    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://api.ceremony-script.tsharliz.com/generate-doc",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(jsonData),
        },
      );

      if (!response.ok) throw new Error("Failed to generate document");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      const groomName = jsonData.groomFirstName || "Groom";
      const brideName = jsonData.brideFirstName || "Bride";
      const fileName = `Ceremony_Script_${brideName}_and_${groomName}.docx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      // Hide loading message
      document.getElementById("loading").classList.add("hidden");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Initialize Flatpickr with dynamic theme
  const datePicker = flatpickr("#date", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today",
    theme: localStorage.getItem("darkMode") === "enabled" ? "dark" : "light", // Set theme on load
  });

  // Check local storage for dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }

  // Toggle Dark Mode & Update Flatpickr Theme
  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      darkModeToggle.textContent = "☀️ Light Mode";
      localStorage.setItem("darkMode", "enabled");
      datePicker.config.theme = "dark"; // Apply dark theme to Flatpickr
    } else {
      darkModeToggle.textContent = "🌙 Dark Mode";
      localStorage.setItem("darkMode", "disabled");
      datePicker.config.theme = "light"; // Apply light theme to Flatpickr
    }

    // Re-render Flatpickr to apply the theme change
    datePicker.destroy();
    flatpickr("#date", datePicker.config);
  });
});
