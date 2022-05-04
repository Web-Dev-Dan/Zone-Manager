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
        weatherSearchPlaceholderBox.classList.remove('element-hidden');
        userWeatherSearchBox.classList.add('element-hidden');
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
        updateWeatherModal();
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

            console.log(data);
            console.log(data.sys.country);
            getCountry(data.sys.country);
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



// ----- 🌍 Get Country (By 2-Letter Code) 🌍 -----
let currentCountryCode = 'gb';
let currentCountry;

function getCountry(country) {
    fetch(`https://restcountries.com/v2/alpha/${country}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            currentCountry = data.name;
            if (cityInput.value) {
                countryInput.value = currentCountry;
            } else {
                countryInput.value = '';
            }
            console.log(currentCountry);
        })
        .catch(error => {
            console.error(error);
        })
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



// ----- 🖼 Update Profile Image 🖼 -----
const changeImageInput = document.querySelector('.choose-profile-img-btn');
const changeImageBtn = document.getElementById('changeImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');

const modalImageBox = document.querySelector('.profile-box--image-circle');
const modalImageBoxIcon = document.querySelector('.profile-box--image-circle-inner');

let profileImageBox = document.getElementById('openUserProfileBtn');
const profileImageBoxInner = document.getElementById('openUserProfileIcon');

let uploadedImage = '';

changeImageInput.addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploadedImage = reader.result;
        modalImageBoxIcon.classList.add('element-hidden');
        modalImageBox.style.backgroundImage = `url(${uploadedImage})`;
        changeImageBtn.classList.add('element-hidden');
        deleteImageBtn.classList.remove('element-hidden');
        profileImageBoxInner.classList.add('element-hidden');
        profileImageBox.style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});

deleteImageBtn.addEventListener('click', function () {
    uploadedImage = '';
    deleteImageBtn.classList.add('element-hidden');
    changeImageBtn.classList.remove('element-hidden');
    modalImageBoxIcon.classList.remove('element-hidden');
    profileImageBoxInner.classList.remove('element-hidden');

    modalImageBox.style.backgroundImage = 'none';
    profileImageBox.style.backgroundImage = 'none';
    changeImageInput.value = '';
    uploadedImage = '';
});




// ----- 🌤 WEATHER MODAL 🌤 -----
const currentLocationCity = document.getElementById('currentLocationCity');
const currentLocationCountry = document.getElementById('currentLocationCountry');
const currentLocationWeatherIcon = document.getElementById('currentLocationWeatherIcon');
const currentLocationWeather = document.getElementById('currentLocationWeather');
const currentLocationTemperature = document.getElementById('currentLocationTemperature');
const currentLocationWindSpeed = document.getElementById('currentLocationWindSpeed');
const currentLocationHumidity = document.getElementById('currentLocationHumidity');

function updateWeatherModal() {
    console.log('Updating Weather Modal!');
    currentLocationCity.textContent = cityName;
    let country;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            currentLocationWeather.textContent = data.weather[0].main;
            currentLocationTemperature.textContent = `${Math.round(data.main.temp)}°C`;
            currentLocationWindSpeed.textContent = `${data.wind.speed}km/h`;
            currentLocationHumidity.textContent = `${data.main.humidity}%`;

            currentLocationWeatherIcon.removeAttribute('class');
            currentLocationWeatherIcon.classList.add('weather-modal--icon', 'fa-solid');

            if (data.weather[0].main === 'Clear') {
                currentLocationWeatherIcon.classList.add('fa-sun');
            } else if (data.weather[0].main === 'Clouds') {
                currentLocationWeatherIcon.classList.add('fa-cloud');
            } else if (data.weather[0].main === 'Snow') {
                currentLocationWeatherIcon.classList.add('fa-snowflake');
            } else if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                currentLocationWeatherIcon.classList.add('fa-cloud-showers-heavy');
            } else if (data.weather[0].main === 'Thunderstorm') {
                currentLocationWeatherIcon.classList.add('fa-cloud-bolt');
            } else if (data.weather[0].main === 'Tornado') {
                currentLocationWeatherIcon.classList.add('fa-tornado');
            } else if (data.weather[0].main === 'Squall') {
                currentLocationWeatherIcon.classList.add('fa-wind');
            } else {
                currentLocationWeatherIcon.classList.add('fa-cloud');
            }

            country = data.sys.country;

            fetch(`https://restcountries.com/v2/alpha/${country}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    currentLocationCountry.textContent = data.name;
                })
                .catch(error => {
                    console.error(error);
                })
        })
        .catch(error => {
            console.error(error);
        });
}


// Get Weather: Use Search
const getWeatherInput = document.getElementById('getWeatherInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

const weatherSearchPlaceholderBox = document.getElementById('weatherSearchPlaceholderBox');
const userWeatherSearchBox = document.getElementById('userWeatherSearchBox');

const getWeatherCity = document.getElementById('getWeatherCity');
const getWeatherCountry = document.getElementById('getWeatherCountry');
const getWeatherIcon = document.getElementById('getWeatherIcon');
const getWeatherWeather = document.getElementById('getWeatherWeather');
const getWeatherTemperature = document.getElementById('getWeatherTemperature');
const getWeatherWindSpeed = document.getElementById('getWeatherWindSpeed');
const getWeatherHumidity = document.getElementById('getWeatherHumidity');

getWeatherBtn.addEventListener('click', function () {
    if (getWeatherInput.value) {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getWeatherInput.value}&appid=${apiKey}&units=metric`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.message === 'city not found') {
                    return;
                } else {
                    console.log(data);
                    weatherSearchPlaceholderBox.classList.add('element-hidden');
                    userWeatherSearchBox.classList.remove('element-hidden');

                    getWeatherCity.textContent = data.name;
                    getWeatherWeather.textContent = data.weather[0].main;
                    getWeatherTemperature.textContent = `${Math.round(data.main.temp)}°C`;
                    getWeatherWindSpeed.textContent = `${data.wind.speed}km/h`;
                    getWeatherHumidity.textContent = `${data.main.humidity}%`;

                    getWeatherIcon.removeAttribute('class');
                    getWeatherIcon.classList.add('weather-modal--icon', 'fa-solid');

                    if (data.weather[0].main === 'Clear') {
                        getWeatherIcon.classList.add('fa-sun');
                    } else if (data.weather[0].main === 'Clouds') {
                        getWeatherIcon.classList.add('fa-cloud');
                    } else if (data.weather[0].main === 'Snow') {
                        getWeatherIcon.classList.add('fa-snowflake');
                    } else if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                        getWeatherIcon.classList.add('fa-cloud-showers-heavy');
                    } else if (data.weather[0].main === 'Thunderstorm') {
                        getWeatherIcon.classList.add('fa-cloud-bolt');
                    } else if (data.weather[0].main === 'Tornado') {
                        getWeatherIcon.classList.add('fa-tornado');
                    } else if (data.weather[0].main === 'Squall') {
                        getWeatherIcon.classList.add('fa-wind');
                    } else {
                        getWeatherIcon.classList.add('fa-cloud');
                    }

                    country = data.sys.country;

                    fetch(`https://restcountries.com/v2/alpha/${country}`)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            getWeatherCountry.textContent = data.name;
                        })
                        .catch(error => {
                            console.error(error);
                        })
                }
            })
            .catch(error => {
                console.error(error);
            })
    } else {
        return;
    }
    getWeatherInput.value = '';
});


