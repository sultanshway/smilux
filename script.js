const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const THEME_KEY = "site-theme";

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    if (themeBtn) {
        const icon = themeBtn.querySelector("i");
        if (icon) {
            icon.className = theme === "light" ? "bx bx-sun" : "bx bx-moon";
        }
    }
}

const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(newTheme);
    });
}

// ================= HERO SLIDER =================
const heroImg = document.getElementById("galleryHeroImg");

const images = [
    "imegs/i1.jpg",
    "imegs/i2.jpg",
    "imegs/i3.jpg",
    "imegs/i4.jpg",
    "imegs/i5.jpg",
    "imegs/i6.jpg",
    "imegs/i7.jpg",
    "imegs/i13.jpg",
    "imegs/i8.jpg",
];

if (heroImg) {
    let index = 0;
    const preloaded = [];

    images.forEach((src) => {
        const img = new Image();
        img.src = src;
        preloaded.push(img);
    });

    heroImg.src = images[0];
    heroImg.classList.add("animate");

    setInterval(() => {
        heroImg.classList.remove("animate");

        setTimeout(() => {
            index = (index + 1) % images.length;
            heroImg.src = preloaded[index].src;
            heroImg.classList.add("animate");
        }, 50);
    }, 2000);
}

// ================= CONTACT FORM =================
function setupContactFormValidation(formId, successMsgId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const phone = form.querySelector("#phone");
        const message = form.querySelector("#message");

        const fields = [name, email, phone, message];

        fields.forEach((field) => {
            if (!field) return;

            const error = field.nextElementSibling;

            if (field.value.trim() === "") {
                if (error) {
                    error.textContent = "This field is required";
                    error.style.display = "block";
                }
                field.classList.add("input-error");
                valid = false;
            } else {
                if (error) error.style.display = "none";
                field.classList.remove("input-error");
            }
        });

        if (email && email.value.trim() !== "") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                if (email.nextElementSibling) {
                    email.nextElementSibling.textContent = "Invalid email format";
                    email.nextElementSibling.style.display = "block";
                }
                email.classList.add("input-error");
                valid = false;
            }
        }

        if (phone && phone.value.trim() !== "") {
            const phonePattern = /^(\+971|0)?[0-9]{8,12}$/;
            if (!phonePattern.test(phone.value)) {
                if (phone.nextElementSibling) {
                    phone.nextElementSibling.textContent = "Invalid UAE phone number";
                    phone.nextElementSibling.style.display = "block";
                }
                phone.classList.add("input-error");
                valid = false;
            }
        }

        if (valid) {
            if (successMsg) {
                successMsg.style.display = "block";
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 3000);
            }

            form.reset();
            fields.forEach((field) => {
                if (field) field.classList.remove("input-error");
            });
        }
    });
}

setupContactFormValidation("contactForm", "successMsg");

// ================= SMART BOOKING =================
const bookingForm = document.getElementById("bookingForm");
const bookingService = document.getElementById("bookingService");
const bookingDate = document.getElementById("bookingDate");
const bookingName = document.getElementById("bookingName");
const bookingEmail = document.getElementById("bookingEmail");
const bookingPhone = document.getElementById("bookingPhone");
const bookingMessage = document.getElementById("bookingMessage");
const timeSlotsContainer = document.getElementById("timeSlots");
const bookingSuccessMsg = document.getElementById("bookingSuccessMsg");
const timeSlotError = document.getElementById("timeSlotError");

const summaryService = document.getElementById("summaryService");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");

let selectedTimeSlot = "";

const allTimeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
];

const bookedSlots = {
    "2026-03-30": ["10:00 AM", "12:30 PM", "03:00 PM"],
    "2026-03-31": ["09:30 AM", "01:00 PM"],
    "2026-04-01": ["11:30 AM", "04:30 PM"],
};

function setMinBookingDate() {
    if (!bookingDate) return;

    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000)
        .toISOString()
        .split("T")[0];

    bookingDate.min = localToday;
}

function isWorkingDay(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    return day !== 5 && day !== 6;
}

function formatBookingDate(dateString) {
    if (!dateString) return "Not selected";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Not selected";

    return date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function updateBookingSummary() {
    if (summaryService) {
        summaryService.textContent = bookingService && bookingService.value
            ? bookingService.value
            : "Not selected";
    }

    if (summaryDate) {
        summaryDate.textContent = bookingDate && bookingDate.value
            ? formatBookingDate(bookingDate.value)
            : "Not selected";
    }

    if (summaryTime) {
        summaryTime.textContent = selectedTimeSlot || "Not selected";
    }
}

function clearFieldError(field) {
    if (!field) return;
    const error = field.nextElementSibling;
    if (error && error.classList.contains("error")) {
        error.style.display = "none";
    }
    field.classList.remove("input-error");
}

function showFieldError(field, message) {
    if (!field) return;
    const error = field.nextElementSibling;
    if (error && error.classList.contains("error")) {
        error.textContent = message;
        error.style.display = "block";
    }
    field.classList.add("input-error");
}

function renderTimeSlots(dateString) {
    if (!timeSlotsContainer) return;

    selectedTimeSlot = "";
    updateBookingSummary();

    if (!dateString) {
        timeSlotsContainer.innerHTML = '<p class="slot-helper">Please choose a date first.</p>';
        return;
    }

    if (!isWorkingDay(dateString)) {
        timeSlotsContainer.innerHTML = '<p class="slot-helper slot-warning">Appointments are available only from Sunday to Thursday.</p>';
        return;
    }

    const unavailableSlots = bookedSlots[dateString] || [];

    timeSlotsContainer.innerHTML = "";

    allTimeSlots.forEach((slot) => {
        const slotBtn = document.createElement("button");
        slotBtn.type = "button";
        slotBtn.className = "time-slot";
        slotBtn.textContent = slot;

        if (unavailableSlots.includes(slot)) {
            slotBtn.classList.add("unavailable");
            slotBtn.disabled = true;
        } else {
            slotBtn.addEventListener("click", () => {
                const currentSelected = timeSlotsContainer.querySelector(".time-slot.selected");
                if (currentSelected) {
                    currentSelected.classList.remove("selected");
                }

                slotBtn.classList.add("selected");
                selectedTimeSlot = slot;
                if (timeSlotError) {
                    timeSlotError.style.display = "none";
                }
                updateBookingSummary();
            });
        }

        timeSlotsContainer.appendChild(slotBtn);
    });
}

function validateBookingForm() {
    if (!bookingForm) return false;

    let valid = true;

    const requiredFields = [
        {
            field: bookingService,
            message: "Please select a service",
        },
        {
            field: bookingDate,
            message: "Please select a date",
        },
        {
            field: bookingName,
            message: "This field is required",
        },
        {
            field: bookingEmail,
            message: "This field is required",
        },
        {
            field: bookingPhone,
            message: "This field is required",
        },
    ];

    requiredFields.forEach((item) => {
        const field = item.field;
        if (!field) return;

        if (field.value.trim() === "") {
            showFieldError(field, item.message);
            valid = false;
        } else {
            clearFieldError(field);
        }
    });

    if (bookingDate && bookingDate.value && !isWorkingDay(bookingDate.value)) {
        showFieldError(bookingDate, "Please select a day from Sunday to Thursday");
        valid = false;
    }

    if (bookingEmail && bookingEmail.value.trim() !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(bookingEmail.value)) {
            showFieldError(bookingEmail, "Invalid email format");
            valid = false;
        }
    }

    if (bookingPhone && bookingPhone.value.trim() !== "") {
        const phonePattern = /^(\+971|0)?[0-9]{8,12}$/;
        if (!phonePattern.test(bookingPhone.value)) {
            showFieldError(bookingPhone, "Invalid UAE phone number");
            valid = false;
        }
    }

    if (!selectedTimeSlot) {
        if (timeSlotError) {
            timeSlotError.textContent = "Please select a time slot";
            timeSlotError.style.display = "block";
        }
        valid = false;
    } else if (timeSlotError) {
        timeSlotError.style.display = "none";
    }

    return valid;
}

function resetBookingForm() {
    if (!bookingForm) return;

    bookingForm.reset();
    selectedTimeSlot = "";

    const selectedSlot = bookingForm.querySelector(".time-slot.selected");
    if (selectedSlot) {
        selectedSlot.classList.remove("selected");
    }

    bookingForm.querySelectorAll(".error").forEach((error) => {
        error.style.display = "none";
    });

    bookingForm.querySelectorAll("input, select, textarea").forEach((field) => {
        field.classList.remove("input-error");
    });

    renderTimeSlots("");
    updateBookingSummary();
    setMinBookingDate();
}

if (bookingForm) {
    setMinBookingDate();
    updateBookingSummary();

    if (bookingService) {
        bookingService.addEventListener("change", updateBookingSummary);
        bookingService.addEventListener("input", () => clearFieldError(bookingService));
    }

    if (bookingDate) {
        bookingDate.addEventListener("change", () => {
            clearFieldError(bookingDate);
            renderTimeSlots(bookingDate.value);
            updateBookingSummary();
        });
    }

    if (bookingName) {
        bookingName.addEventListener("input", () => clearFieldError(bookingName));
    }

    if (bookingEmail) {
        bookingEmail.addEventListener("input", () => clearFieldError(bookingEmail));
    }

    if (bookingPhone) {
        bookingPhone.addEventListener("input", () => clearFieldError(bookingPhone));
    }

    if (bookingMessage) {
        bookingMessage.addEventListener("input", () => clearFieldError(bookingMessage));
    }

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const isValid = validateBookingForm();

        if (!isValid) return;

        if (bookingSuccessMsg) {
            bookingSuccessMsg.style.display = "block";
            setTimeout(() => {
                bookingSuccessMsg.style.display = "none";
            }, 4000);
        }

        resetBookingForm();
    });
}

// ================= BACK TO TOP =================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ================= NAV =================
function goBack() {
    window.location.href = "index.html";
}

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}