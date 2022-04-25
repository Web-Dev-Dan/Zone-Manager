// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Update Year in Footer:
    const currentYearText = document.getElementById('currentYear');
    currentYearText.textContent = currentYear;
}

updateYear();
