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
    "imegs/i9.jpg",
    // "imegs/i10.jpg",
    "imegs/i11.jpg",
    // "imegs/i12.jpg",
    "imegs/i14.jpg",
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

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        const fields = [name, email, phone, message];

        fields.forEach((field) => {
            const error = field.nextElementSibling;

            if (field.value.trim() === "") {
                error.textContent = "This field is required";
                error.style.display = "block";
                valid = false;
            } else {
                error.style.display = "none";
            }
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            email.nextElementSibling.textContent = "Invalid email format";
            email.nextElementSibling.style.display = "block";
            valid = false;
        }

        const phonePattern = /^(\+971|0)?[0-9]{8,12}$/;
        if (!phonePattern.test(phone.value)) {
            phone.nextElementSibling.textContent = "Invalid UAE phone number";
            phone.nextElementSibling.style.display = "block";
            valid = false;
        }

        if (valid) {
            if (successMsg) {
                successMsg.style.display = "block";

                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 3000);
            }

            form.reset();
        }
    });
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
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

const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'site-theme';

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const icon = themeBtn.querySelector('i');
    icon.className = theme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});
