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
      a.download = "Ceremony_Script.docx";
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
