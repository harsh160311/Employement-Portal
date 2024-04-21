// SetUp panels__blog
const signin__btn = document.querySelector("#signin__btn");
const signup__btn = document.querySelector("#register__btn");
const container = document.querySelector(".container");

signin__btn.addEventListener("click", () => {
    container.classList.remove("signup-mode");
    document.title = "Login In"
    document.cookie = `page=signin; expires=${daysToExpire}`;
});

signup__btn.addEventListener("click", () => {
    container.classList.add("signup-mode");
    document.title = "Register Page"
    document.cookie = `page=register; expires=${daysToExpire}`;
});

const formPages = document.querySelector(".form_pages");
const nextBtn = document.querySelectorAll(".nextBtn");
const steps = document.querySelectorAll(".steps");
const registerBtn = document.querySelector("#submit_button");

for (let i = 0; i < 2; i++) {
    nextBtn[i].addEventListener("click", function () {
        formPages.style.transform = `translateX(-${
            i == 0 ? "33.33%" : "66.66%"
        })`;
        steps[i].classList.add("active");
    });
}

registerBtn.addEventListener("click", function () {
    alert("Page is Under Construction");
});
