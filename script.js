// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Update Year in Footer:
    const currentYearText = document.getElementById('currentYear');
    currentYearText.textContent = currentYear;
}

updateYear();



// 👨‍💻 User Profile Notification Bubble
const closeProfileNotificationBtn = document.getElementById('closeProfileNotificationBtn');
const profileNotificationBubble = document.getElementById('profileNotificationBubble');

closeProfileNotificationBtn.addEventListener('click', closeProfileNotificationBubble);

function closeProfileNotificationBubble() {
    profileNotificationBubble.classList.add('element-hidden');
}
