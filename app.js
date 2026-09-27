// ---------- navbar background on scroll ----------
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ---------- mobile menu ----------
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    // change icon between bars and X
    if (navLinks.classList.contains("open")) {
        menuIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ---------- countdown timer ----------
const eventDate = new Date("October 17, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = eventDate - now;

    if (gap < 0) {
        document.querySelector(".countdown").innerHTML = "<h3>The event has started!</h3>";
        return;
    }

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);

    // add a 0 in front if number is less than 10
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- choose your hero ----------
const heroes = [
    {
        name: "Iron Man",
        role: "The Builder · Hardware & IoT",
        text: "You love building things from scratch. Sensors, circuits, robots - if it needs hardware, you are the one for the job.",
        icon: "fa-solid fa-microchip",
        color: "#e62429"
    },
    {
        name: "Captain America",
        role: "The Leader · Team Lead & Pitching",
        text: "You keep the team together even at 4 AM. You plan the project and give the final presentation to the judges.",
        icon: "fa-solid fa-shield-halved",
        color: "#2f6bff"
    },
    {
        name: "Thor",
        role: "The Powerhouse · Backend",
        text: "Servers, APIs and databases are your hammer. You make sure the app doesn't crash during the demo.",
        icon: "fa-solid fa-bolt",
        color: "#38bdf8"
    },
    {
        name: "Spider-Man",
        role: "The Web Slinger · Frontend",
        text: "You spin beautiful websites and apps. Designs, animations and responsive layouts are your thing.",
        icon: "fa-solid fa-spider",
        color: "#ef233c"
    },
    {
        name: "Black Panther",
        role: "The Protector · Cyber Security",
        text: "You protect the team's project from attacks. Security, encryption and blockchain are your powers.",
        icon: "fa-solid fa-paw",
        color: "#a855f7"
    },
    {
        name: "Scarlet Witch",
        role: "The Magician · AI & ML",
        text: "You bend reality with data. Machine learning models and AI tools are your magic.",
        icon: "fa-solid fa-wand-magic-sparkles",
        color: "#ff2d75"
    }
];

const heroPicker = document.getElementById("heroPicker");

// create a card for every hero
heroes.forEach(function (hero, index) {
    const div = document.createElement("div");
    div.className = "hero-option";
    div.style.setProperty("--hero-color", hero.color);
    div.innerHTML = '<i class="' + hero.icon + '"></i><p>' + hero.name + '</p>';

    if (index === 0) {
        div.classList.add("active");
    }

    div.addEventListener("click", function () {
        showHero(index);
    });

    heroPicker.appendChild(div);
});

function showHero(index) {
    const hero = heroes[index];

    document.getElementById("heroName").innerText = hero.name;
    document.getElementById("heroRole").innerText = hero.role;
    document.getElementById("heroText").innerText = hero.text;
    document.getElementById("heroIcon").innerHTML = '<i class="' + hero.icon + '"></i>';

    // change the accent colour of the whole website
    document.documentElement.style.setProperty("--accent", hero.color);

    // highlight the selected card
    const options = document.querySelectorAll(".hero-option");
    options.forEach(function (opt) {
        opt.classList.remove("active");
    });
    options[index].classList.add("active");
}

// ---------- schedule tabs ----------
const tabs = document.querySelectorAll(".day-tab");

tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".day-content").forEach(function (c) { c.classList.remove("active"); });

        tab.classList.add("active");
        document.getElementById(tab.dataset.day).classList.add("active");
    });
});

// ---------- faq accordion ----------
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
    item.querySelector(".faq-question").addEventListener("click", function () {
        // close the others first
        faqItems.forEach(function (other) {
            if (other !== item) other.classList.remove("open");
        });
        item.classList.toggle("open");
    });
});

// ---------- fade in on scroll ----------
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
    fadeElements.forEach(function (el) {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", checkFade);
checkFade();

// ---------- registration form ----------
const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const team = document.getElementById("team");
    const track = document.getElementById("track");

    let isValid = true;

    // remove old errors
    document.querySelectorAll(".input-group").forEach(function (g) {
        g.classList.remove("invalid");
    });

    if (name.value.trim().length < 3) {
        name.parentElement.classList.add("invalid");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        email.parentElement.classList.add("invalid");
        isValid = false;
    }

    const phonePattern = /^[6-9][0-9]{9}$/;
    if (!phonePattern.test(phone.value.trim())) {
        phone.parentElement.classList.add("invalid");
        isValid = false;
    }

    if (team.value.trim() === "") {
        team.parentElement.classList.add("invalid");
        isValid = false;
    }

    if (track.value === "") {
        track.parentElement.classList.add("invalid");
        isValid = false;
    }

    // if everything is correct show success message
    if (isValid) {
        form.style.display = "none";
        document.getElementById("successMsg").style.display = "block";
        document.getElementById("successText").innerText =
            "Welcome " + name.value.trim() + "! Team " + team.value.trim() +
            " has been registered. Check your email for more details.";
    }
});