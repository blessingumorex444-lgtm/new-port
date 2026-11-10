

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});



const allSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            navItems.forEach(function (link) {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
});



const animatedElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-logo, .skill-card, .projects-content, .contact-information, .contact-form"
);

animatedElements.forEach(function (element) {
    element.classList.add("reveal");
});

const animationObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            animationObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

animatedElements.forEach(function (element) {
    animationObserver.observe(element);
});




document.getElementById("year").textContent =
    new Date().getFullYear();



const cookieBanner = document.getElementById("cookieBanner");

const cookieModal = document.getElementById("cookieModal");

const analyticsToggle = document.getElementById("analyticsToggle");

const cookieKey = "blessidoCookiePreferences";

let savedPreferences = null;

try {
    savedPreferences = JSON.parse(localStorage.getItem(cookieKey));
} catch (error) {
    savedPreferences = null;
}



if (!savedPreferences) {
    cookieBanner.hidden = false;
}




function saveCookieChoice(analytics) {

    const preferences = {

        essential: true,

        analytics: analytics,

        savedAt: new Date().toISOString()

    };

    localStorage.setItem(
        cookieKey,
        JSON.stringify(preferences)
    );

    savedPreferences = preferences;

    cookieBanner.hidden = true;

    cookieModal.hidden = true;

}




document.getElementById("acceptCookies").addEventListener("click", function () {

    saveCookieChoice(true);

});




document.getElementById("rejectCookies").addEventListener("click", function () {

    saveCookieChoice(false);

});




document.getElementById("manageCookies").addEventListener("click", function () {

    analyticsToggle.checked =
        Boolean(savedPreferences && savedPreferences.analytics);

    cookieModal.hidden = false;

});



document.getElementById("closeCookieModal").addEventListener("click", function () {

    cookieModal.hidden = true;

});




document.getElementById("saveCookiePreferences").addEventListener("click", function () {

    saveCookieChoice(analyticsToggle.checked);

});




cookieModal.addEventListener("click", function (event) {

    if (event.target === cookieModal) {

        cookieModal.hidden = true;

    }

});


const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const subjectInput = document.getElementById("subject");

const messageInput = document.getElementById("message");

const privacyConsent = document.getElementById("privacyConsent");

const formStatus = document.getElementById("formStatus");


function showError(errorId, message) {

    document.getElementById(errorId).textContent = message;

}


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    

    showError("nameError", "");

    showError("emailError", "");

    showError("subjectError", "");

    showError("messageError", "");

    showError("consentError", "");

    formStatus.textContent = "";


    

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();


    let isValid = true;


    

    if (name.length < 2) {

        showError("nameError", "Please enter your full name.");

        isValid = false;

    }



    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showError("emailError", "Please enter a valid email address.");

        isValid = false;

    }


    

    if (subject === "") {

        showError("subjectError", "Please enter a subject.");

        isValid = false;

    }


    

    if (message.length < 10) {

        showError("messageError", "Your message must contain at least 10 characters.");

        isValid = false;

    }


    

    if (!privacyConsent.checked) {

        showError("consentError", "You must agree to the Privacy Notice before sending.");

        isValid = false;

    }


    

    if (!isValid) {

        return;

    }




    const myEmail = "your-email@example.com";


    

    const emailBody =
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage: " + message;


    const mailLink =
        "mailto:" + myEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(emailBody);


    formStatus.textContent =
        "Opening your email application. Please send the prepared message.";

    window.location.href = mailLink;

});
