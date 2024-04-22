// Set up panels for blog
const signin__btn = document.querySelector("#signin__btn");
const signup__btn = document.querySelector("#register__btn");
const container = document.querySelector(".container");
const daysToExpire = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();

// Check if cookie exists for page selection
checkCookie("page") ? container.classList.add("signup-mode") : "";

// Event listener for sign-in button
signin__btn.addEventListener("click", () => {
    container.classList.remove("signup-mode");
    document.title = "Login Page";
    document.cookie = `page=signin; expires=${daysToExpire}`;
});

// Event listener for sign-up button
signup__btn.addEventListener("click", () => {
    container.classList.add("signup-mode");
    document.title = "Register Page";
    document.cookie = `page=register; expires=${daysToExpire}`;
});

// Function to check if cookie exists
function checkCookie(userName) {
    const cokkieName = getCookie(userName);
    return cokkieName !== undefined && cokkieName !== 'signin';
}

// Function to retreive cookie
function getCookie(userName) {
    const name = userName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const  cokkieArray = decodedCookie.split(';');
    for (let i = 0; i < cokkieArray.length; i++) {
        let cookie = cokkieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;    
    
}

// Selectors and variables for form validation
const nextBtn = document.querySelectorAll(".nextBtn"); // Select all 'Next' buttons
const emailInput = document.getElementById("emailInput"); // Select email input field
const errorMessage = document.querySelector(".error_email"); // Select error message element
const formPages = document.querySelector(".form_pages"); // Select form pages container
const steps = document.querySelectorAll(".steps"); // Select all steps

// Function to validate email
const validateEmail = (eml) => {
    return String(eml).toLowerCase().endsWith("@gmail.com");
};

// Event listener for 'Next' buttons
nextBtn.forEach(function (button, index) {
    button.addEventListener("click", function () {
        if (emailInput.value.length >= 1) { // Check if email input is filled
            emailInput.classList.add("filled"); // Add filled class
            if (!validateEmail(emailInput.value)) { // Validate email format
                errorMessage.style.display = "block"; // Display error message for invalid email
            } else {
                errorMessage.style.display = "none"; // Hide error message for valid email
                moveNext(index); // Move to next step
            }
        } else {
            errorMessage.style.display = "none"; // Hide error message if email input is empty
        }
    });
});

// Function to move to next step
function moveNext(currentIndex) {
    const formPages = document.querySelector(".form_pages"); // Select form pages container
    const steps = document.querySelectorAll(".steps"); // Select all steps

    const nextIndex = currentIndex + 1; // Calculate next step index

    formPages.style.transform = `translateX(-${nextIndex * 33.33}%)`; // Move to next step

    steps[nextIndex].classList.add("active"); // Add active class to next step
}

// Toggle password visibility
const passwordEye = document.querySelectorAll(".passwordEye"); // Select password visibility toggles
const allPassword = document.querySelectorAll(".form_pass"); // Select all password input fields
for (let i = 0; i < passwordEye.length; i++) {
    passwordEye[i].addEventListener("click", function () {
        this.classList.toggle("show");
        if (this.classList.contains("show")) {
            allPassword[i].setAttribute("type", "text"); // Show password
        } else {
            allPassword[i].setAttribute("type", "password"); // Hide password
        }
        allPassword[i].focus(); // Focus on password input
    });
}

const passwordContent = document.querySelectorAll(".password__content");
const errorPass = document.querySelector(".error_pass");
const password = document.querySelectorAll(".form_password");

// Add event listeners for password input
for (let i = 0; i < password.length; i++) {
    password[i].addEventListener("input", function () {
        const passValue = password[i].value;
        const strength = checkStrength(passValue);
        updatePasswordIndicator(i, strength);
        updateErrorDisplay(strength);
    });

    password[i].addEventListener("focus", function () {
        if (passwordContent[i]) { // Check if the element exists
            passwordContent[i].classList.add("active");
        }
    });

    password[i].addEventListener("blur", function () {
        if (passwordContent[i]) { // Check if the element exists
            passwordContent[i].classList.remove("active");
        }
    });
}

function checkStrength(value) {
    let strength = 0;
    if (value.length > 5) {
        strength++;
    }
    if (value.match(/[0-9]/g)) {
        strength++;
    }
    if (value.match(/[A-Z]/g)) {
        strength++;
    }
    return strength;
}

function updatePasswordIndicator(index, strength) {
    const passwordIndicator = document.querySelectorAll(".password__indicator span")[index];
    if (passwordIndicator) { // Check if the element exists
        const weak = document.querySelectorAll("#passWeak")[index];
        const medium = document.querySelectorAll("#passMedium")[index];
        const strong = document.querySelectorAll("#passStrong")[index];

        const indicators = [weak, medium, strong];

        if (passwordIndicator) {
            const width = (strength / 3) * 100 + "%";
            passwordIndicator.style.width = width;
    
            if (strength >= 3) {
                passwordIndicator.style.background = "#00ff00"; // Green for strong
            } else if (strength === 2) {
                passwordIndicator.style.background = "yellow"; // Yellow for medium
            } else {
                passwordIndicator.style.background = "#ff2340"; // Red for weak
            }
        }

        indicators.forEach((indicator, i) => {
            if (indicator) { // Check if the element exists
                indicator.style.color = i < strength ? "#00ff00" : "#ff2340";
            }
        });
    }
}

function updateErrorDisplay(strength) {
    if (errorPass) { // Check if the element exists
        errorPass.style.display = strength === 3 ? "none" : "block";
    }
}
