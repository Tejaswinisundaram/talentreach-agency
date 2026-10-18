
/* =================================
   1. SELECT HTML ELEMENTS
================================= */

const applyButtons = document.querySelectorAll(".apply-btn");
const jobCards = document.querySelectorAll(".job-card");

const searchInput = document.querySelector("#job-search");
const categorySelect = document.querySelector("#job-category");
const jobResults = document.querySelector("#job-results");

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const messageInput = document.querySelector("#message");

/* =================================
   2. SEARCH AND FILTER JOBS
================================= */

function filterJobs() {
    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categorySelect.value;

    let visibleJobs = 0;

    jobCards.forEach(function (card) {
        const jobTitle = card.querySelector("h3")
            .textContent.toLowerCase();

        const jobDescription = card.textContent.toLowerCase();

        const category = card.dataset.category;

        const matchesSearch =
            jobTitle.includes(searchTerm) ||
            jobDescription.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow =
            matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleJobs++;
        }
    });

    if (visibleJobs === 0) {
        jobResults.textContent =
            "No matching jobs found. Try another search.";
    } else {
        jobResults.textContent =
            visibleJobs + (visibleJobs === 1
                ? " opportunity found."
                : " opportunities found.");
    }
}

searchInput.addEventListener("input", filterJobs);

categorySelect.addEventListener("change", filterJobs);

// Display the initial number of jobs.
filterJobs();

/* =================================
   3. APPLY NOW BUTTONS
================================= */

applyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const jobTitle = button.dataset.job;

        messageInput.value =
            "I am interested in applying for: " + jobTitle;

        document.querySelector("#contact").scrollIntoView({
            behavior: "smooth"
        });

        document.querySelector("#name").focus({
            preventScroll: true
        });
    });
});

/* =================================
   4. CONTACT FORM VALIDATION
================================= */

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name")
        .value.trim();

    const email = document.querySelector("#email")
        .value.trim();

    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        formStatus.textContent =
            "Please complete all fields before submitting.";
        return;
    }

    formStatus.textContent =
        "Thank you, " + name +
        "! Your form passed validation. " +
        "This demo does not send or store your message.";

    contactForm.reset();
});
