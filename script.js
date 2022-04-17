// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    const currentYearText = document.getElementById('currentYear');
    currentYearText.textContent = currentYear;
}

updateYear();
