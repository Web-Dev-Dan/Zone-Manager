// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    const currentYearText = document.getElementById('currentYear');
    currentYearText.textContent = currentYear;
}

updateYear();


// ----- 👨‍💻 User Profile 👨‍💻 -----
const openUserProfileBtn = document.getElementById('openUserProfileBtn');
const userProfileModal = document.getElementById('userProfileModal');
const closeUserProfileBtn = document.getElementById('closeUserProfileBtn');

openUserProfileBtn.addEventListener('click', toggleUserProfile);
closeUserProfileBtn.addEventListener('click', toggleUserProfile);

// User Profile Modal:
function toggleUserProfile() {
    if (userProfileModal.classList.contains('element-hidden')) {
        userProfileModal.classList.remove('element-hidden');
    } else {
        userProfileModal.classList.add('element-hidden');
    }

    // Close Notification Bubble
    if (profileNotificationBubble.classList.contains('element-hidden')) {
        return;
    } else {
        closeProfileNotificationBubble();
    }
}

// User Profile Notification Bubble
const closeProfileNotificationBtn = document.getElementById('closeProfileNotificationBtn');
const profileNotificationBubble = document.getElementById('profileNotificationBubble');

closeProfileNotificationBtn.addEventListener('click', closeProfileNotificationBubble);

function closeProfileNotificationBubble() {
    profileNotificationBubble.classList.add('element-hidden');
}
