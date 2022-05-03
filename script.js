// ----- 📆 Update Date (Year) 📆 -----
function updateYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Update Year in Footer:
    const currentYearText = document.getElementById('currentYear');
    currentYearText.textContent = currentYear;
}

updateYear();



// ----- 👨‍💻 User Profile Notification Bubble 👨‍💻 -----
const userProfileBtn = document.getElementById('openUserProfileBtn');
const boxContainer = document.getElementById('boxContainer');
const modalBackground = document.getElementById('modalBackground');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModalBtn');

const modalHeader = document.getElementById('modalHeader');

userProfileBtn.addEventListener('click', toggleUserModal);
modalBackground.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
    console.log('Modal toggled!');
    boxContainer.classList.toggle('element-hidden');
    modalBackground.classList.toggle('element-hidden');
    modalContainer.classList.toggle('element-hidden');
}

function toggleUserModal() {
    toggleModal();
    modalHeader.textContent = 'My Profile';
    checkModal('User');
    showModal(userModal);
    getWeather();
}



// ----- 🖱 Buttons Clicked 🖱 -----
const mainBtns = document.querySelectorAll('.box-container-btn');

mainBtns.forEach(btn => {
    btn.addEventListener('click', mainBtnPressed);
});

function mainBtnPressed(e) {
    const clicked = e.target;
    toggleModal();

    if (clicked.id === 'timeBtn') {
        // ⏰ Time:
        modalHeader.textContent = 'Get Time';
        checkModal('Time');
        showModal(timeModal);
    } else if (clicked.id === 'weatherBtn') {
        // 🌤 Weather:
        modalHeader.textContent = 'Get Weather';
        checkModal('Weather');
        showModal(weatherModal);
    } else if (clicked.id === 'addContactBtn') {
        // 🙍‍♂️ Contacts:
        modalHeader.textContent = 'Add Contact';
        checkModal('Contact');
        showModal(contactModal);
    } else if (clicked.id === 'createGroupBtn') {
        // 🎯 Groups:
        modalHeader.textContent = 'Create Group';
        checkModal('Group');
        showModal(groupModal);
    } else {
        return;
    }
}

// Modal Bodies
let userModal = document.getElementById('userModal');
let timeModal = document.getElementById('timeModal');
let weatherModal = document.getElementById('weatherModal');
let contactModal = document.getElementById('contactModal');
let groupModal = document.getElementById('groupModal');

function showModal(modal) {
    modal.classList.remove('element-hidden');
}

function checkModal(modal) {
    if (modal === 'User') {
        userModal.classList.remove('element-hidden');
    } else {
        userModal.classList.add('element-hidden');
    }
    if (modal === 'Time') {
        timeModal.classList.remove('element-hidden');
    } else {
        timeModal.classList.add('element-hidden');
    }
    if (modal === 'Weather') {
        weatherModal.classList.remove('element-hidden');
    } else {
        weatherModal.classList.add('element-hidden');
    }
    if (modal === 'Contact') {
        contactModal.classList.remove('element-hidden');
    } else {
        contactModal.classList.add('element-hidden');
    }
    if (modal === 'Group') {
        groupModal.classList.remove('element-hidden');
    } else {
        groupModal.classList.add('element-hidden');
    }
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
// const weatherIcon; 
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
            checkWeatherIcon(data.weather[0].main);
        })
        .catch(error => {
            console.error(error);
        })
}

function checkWeatherIcon(weather) {
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.removeAttribute('class');
    weatherIcon.classList.add('weather-icon-box--icon', 'fa-solid');

    if (weather === 'Clear') {
        weatherIcon.classList.add('fa-sun');
    } else if (weather === 'Clouds') {
        weatherIcon.classList.add('fa-cloud');
    } else if (weather === 'Snow') {
        weatherIcon.classList.add('fa-snowflake');
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        weatherIcon.classList.add('fa-cloud-showers-heavy');
    } else if (weather === 'Thunderstorm') {
        weatherIcon.classList.add('fa-cloud-bolt');
    } else if (weather === 'Tornado') {
        weatherIcon.classList.add('fa-tornado');
    } else if (weather === 'Squall') {
        weatherIcon.classList.add('fa-wind');
    } else {
        weatherIcon.classList.add('fa-cloud');
    }
}


// ----- 💬 Update Information 💬 -----
const nameInput = document.getElementById('nameInput');
const cityInput = document.getElementById('cityInput');
const countryInput = document.getElementById('countryInput');
const submitInfoBtn = document.getElementById('submitInfoBtn');

submitInfoBtn.addEventListener('click', updateInfo);

function updateInfo() {
    const nameIcon = document.getElementById('nameIcon');
    const cityIcon = document.getElementById('cityIcon');
    const countryIcon = document.getElementById('countryIcon');

    // fa-square-check
    nameIcon.removeAttribute('class');
    cityIcon.removeAttribute('class');
    countryIcon.removeAttribute('class');

    if (nameInput.value) {
        nameIcon.classList.add('option-icon', 'option-icon-positive', 'fa-solid', 'fa-square-check');
    } else {
        nameIcon.classList.add('option-icon', 'option-icon-negative', 'fa-solid', 'fa-triangle-exclamation');
    }
    if (cityInput.value) {
        cityIcon.classList.add('option-icon', 'option-icon-positive', 'fa-solid', 'fa-square-check');
        cityName = cityInput.value;
        getWeather();
    } else {
        cityIcon.classList.add('option-icon', 'option-icon-negative', 'fa-solid', 'fa-triangle-exclamation');
    }
    if (countryInput.value) {
        countryIcon.classList.add('option-icon', 'option-icon-positive', 'fa-solid', 'fa-square-check');
    } else {
        countryIcon.classList.add('option-icon', 'option-icon-negative', 'fa-solid', 'fa-triangle-exclamation');
    }
}
