// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Update Year in Footer:
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
        getWeather();
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

// 👨‍💻 User Profile Notification Bubble
const closeProfileNotificationBtn = document.getElementById('closeProfileNotificationBtn');
const profileNotificationBubble = document.getElementById('profileNotificationBubble');

closeProfileNotificationBtn.addEventListener('click', closeProfileNotificationBubble);

function closeProfileNotificationBubble() {
    profileNotificationBubble.classList.add('element-hidden');
}


// ----- ⏰📆 DATE AND TIME 📆⏰ -----

// 📆 Date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dateText = document.getElementById('dateText');

function calculateDate() {
    const currentFullDate = new Date();
    let currentDay = days[currentFullDate.getDay()];
    let currentDate = currentFullDate.getDate();
    let currentMonth = months[currentFullDate.getMonth()];
    let currentYear = currentFullDate.getFullYear();

    dateText.textContent = `${currentDay} ${currentDate} ${currentMonth}, ${currentYear}.`;
}

// ⏰ Clock
const clockFingerHours = document.getElementById('clockFingerHours');
const clockFingerMinutes = document.getElementById('clockFingerMinutes');
const clockFingerSeconds = document.getElementById('clockFingerSeconds');

const timeText = document.getElementById('timeText');

function updateUserClock() {
    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    let currentSeconds = currentDate.getSeconds();

    let degreesHours = currentHours * 30;
    let degreeMinutes = currentMinutes * 6;
    let degreeSeconds = currentSeconds * 6;

    // Check Hours
    if (currentHours < 10) {
        currentHours = `0${currentHours}`;
        clockFingerHours.style.transform = `translateX(-50%) rotate(${degreesHours}deg)`
    } else {
        clockFingerHours.style.transform = `translateX(-50%) rotate(${degreesHours}deg)`
    }

    // Check Minutes
    if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
        clockFingerMinutes.style.transform = `translateX(-50%) rotate(${degreeMinutes}deg)`
    } else {
        clockFingerMinutes.style.transform = `translateX(-50%) rotate(${degreeMinutes}deg)`
    }

    // Check Seconds
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
        clockFingerSeconds.style.transform = `translateX(-50%) rotate(${degreeSeconds}deg)`
    } else {
        clockFingerSeconds.style.transform = `translateX(-50%) rotate(${degreeSeconds}deg)`
    }

    timeText.textContent = `${currentHours}:${currentMinutes}:${currentSeconds}`;
}

// Update Time and Date each second
setInterval(() => {
    calculateDate();
    updateUserClock();
}, 1000);


// ----- 🌤 Weather API 🌤 -----
const weatherText = document.getElementById('weatherText');
const cityText = document.getElementById('cityText');
const temperatureText = document.getElementById('temperatureText');

const apiKey = '84f6f4d0561b37b364b619246ea847fa';
let cityName = 'London';

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            weatherText.textContent = data.weather[0].main;
            cityText.textContent = data.name;
            temperatureText.textContent = `${Math.round(data.main.temp)}°C`;
        })
        .catch(error => {
            console.error(error);
        })
}
