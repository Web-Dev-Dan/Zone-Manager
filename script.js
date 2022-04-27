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
    } else if (clicked.id === 'weatherBtn') {
        // 🌤 Weather:
        modalHeader.textContent = 'Get Weather';
    } else if (clicked.id === 'addContactBtn') {
        // 🙍‍♂️ Contacts:
        modalHeader.textContent = 'Add Contact';
    } else if (clicked.id === 'createGroupBtn') {
        // 🎯 Groups:
        modalHeader.textContent = 'Create Group';
    } else {
        return;
    }
}
