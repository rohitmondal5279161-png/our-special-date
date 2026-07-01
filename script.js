/* ==========================================================
   OUR SPECIAL DATE ❤️
   SCRIPT.JS - PART 1
========================================================== */

// ---------- Element References ----------

// Loader
const loader = document.getElementById("loader");

// Music
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Pages
const pages = document.querySelectorAll(".page");

const welcomePage = document.getElementById("welcomePage");
const proposalPage = document.getElementById("proposalPage");
const datePage = document.getElementById("datePage");

// Buttons
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// ---------- Loader ----------

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1800);
});

// ---------- Page Navigation ----------

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ---------- Start Button ----------

startBtn.addEventListener("click", () => {
    showPage("proposalPage");
});

// ---------- Funny NO Button ----------

const funnyTexts = [
    "Are you sure? 🥺",
    "Think again ❤️",
    "Please? 🌹",
    "Don't break my heart 💔",
    "Try YES 😄",
    "You can't catch me 😜"
];

let funnyIndex = 0;

noBtn.addEventListener("mouseover", () => {

    const card = noBtn.parentElement;

    const maxX = card.clientWidth - noBtn.offsetWidth;
    const maxY = 180;

    noBtn.style.position = "relative";
    noBtn.style.left = Math.random() * maxX - maxX / 2 + "px";
    noBtn.style.top = Math.random() * maxY - maxY / 2 + "px";

    noBtn.innerText = funnyTexts[funnyIndex];

    funnyIndex++;

    if (funnyIndex >= funnyTexts.length) {
        funnyIndex = 0;
    }

});

// ---------- YES Button ----------

yesBtn.addEventListener("click", () => {
    showPage("datePage");
});

// ---------- Music ----------

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        bgMusic.pause();
        musicBtn.innerHTML = "🎵";
        musicBtn.classList.remove("playing");

    } else {

        bgMusic.play();
        musicBtn.innerHTML = "🔊";
        musicBtn.classList.add("playing");

    }

    musicPlaying = !musicPlaying;

});
/* ==========================================================
   SCRIPT.JS - PART 2A
   Date Selection
========================================================== */

// ---------- Date Page ----------

const dateNextBtn = document.getElementById("dateNextBtn");
const datePicker = document.getElementById("datePicker");
const timePage = document.getElementById("timePage");

// Store user's selections
let selectedDate = "";
let selectedTime = "";
let selectedFoods = [];

// Date → Time
dateNextBtn.addEventListener("click", () => {

    // Check if a date is selected
    if (datePicker.value === "") {

        alert("📅 Please choose a date first.");
        return;

    }

    selectedDate = datePicker.value;

    showPage("timePage");

});
/* ==========================================================
   SCRIPT.JS - PART 2B
   Time Selection
========================================================== */

const timePicker = document.getElementById("timePicker");
const timeNextBtn = document.getElementById("timeNextBtn");

// Time → Food
timeNextBtn.addEventListener("click", () => {

    if (timePicker.value === "") {

        alert("⏰ Please choose a time first.");
        return;

    }

    selectedTime = timePicker.value;

    showPage("foodPage");

});
/* ==========================================================
   SCRIPT.JS - PART 2C
   Food Selection
========================================================== */

const foodCards = document.querySelectorAll(".food-card");
const customFood = document.getElementById("customFood");
const foodNextBtn = document.getElementById("foodNextBtn");

// Select/Deselect food cards
foodCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("selected");

    });

});

// Food → Confirmation
foodNextBtn.addEventListener("click", () => {

    selectedFoods = [];

    // Get selected cards
    foodCards.forEach(card => {

        if (card.classList.contains("selected")) {

            selectedFoods.push(card.dataset.food);

        }

    });

    // Add custom food
    if (customFood.value.trim() !== "") {

        selectedFoods.push(customFood.value.trim());

    }

    if (selectedFoods.length === 0) {

        alert("🍽️ Please choose at least one food.");

        return;

    }

    showConfirmation();

});
/* ==========================================================
   SCRIPT.JS - PART 3A
   Confirmation Popup
========================================================== */

function showConfirmation() {

    const foodList = selectedFoods.join(", ");

    // Format Date
const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

document.getElementById("summaryDate").textContent = formattedDate;

// Format Time
const formattedTime = new Date(
    "1970-01-01T" + selectedTime
).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
});

document.getElementById("summaryTime").textContent = formattedTime;

    document.getElementById("summaryFood").innerHTML =
    selectedFoods
        .map(food => `<span class="food-tag">${food}</span>`)
        .join("");
    document.getElementById("confirmModal").classList.add("show");

    document.getElementById("editBtn").onclick = () => {
        document.getElementById("confirmModal").classList.remove("show");
    };

    document.getElementById("continueBtn").onclick = () => {
        document.getElementById("confirmModal").classList.remove("show");
       showPage("bouquetPage");

setTimeout(() => {
    typeMessage();
}, 1700);
};
}
const loveMessage =
"Every flower in this bouquet carries a little piece of my love for you. I hope it makes you smile just as you make me smile every day. ❤️";

function typeMessage() {

    const typingText = document.getElementById("typingText");

    typingText.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        typingText.innerHTML += loveMessage.charAt(i);

        i++;

        if (i >= loveMessage.length) {
            clearInterval(typing);
        }

    }, 40); // typing speed
}
function startRelationshipTimer() {

    const startDate = new Date("2019-11-01T00:00:00");

    function updateTimer() {

        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const diff = now - startDate;

        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        document.getElementById("years").textContent = years;
        document.getElementById("months").textContent = months;
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}
let timerStarted = false;

document.getElementById("showTimerBtn").onclick = () => {

    showPage("timerPage");

    if (!timerStarted) {
        startRelationshipTimer();
        timerStarted = true;
    }

};
document.getElementById("finalBtn").onclick = () => {

    loadFinalPage();

    showPage("finalPage");

    setTimeout(() => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 50);

};
function loadFinalPage() {

    // Date
    const dateObj = new Date(selectedDate);

    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("finalDate").textContent = formattedDate;

   const formattedTime = new Date(
    "1970-01-01T" + selectedTime
).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
});

document.getElementById("finalTime").textContent = formattedTime;
    const finalFood = document.getElementById("finalFood");

    finalFood.innerHTML = selectedFoods
    .map(food => `<div class="food-item">🍽️ ${food}</div>`)
    .join("");
}
/* ==========================================================
   PART 4
   WhatsApp Date Plan
========================================================== */

document.getElementById("sendPlanBtn").addEventListener("click", () => {

    // Food list
    const foodText = selectedFoods
        .map(food => `🍽️ ${food}`)
        .join("\n");

    // Final WhatsApp Message
    const message = `🌹✨ *OUR DATE IS OFFICIAL!* ✨🌹

Hey Love ❤️,

You just made me the happiest person by saying *YES!* 🥹

Everything is finally planned, and I honestly can't wait for our special day.

━━━━━━━━━━━━━━━━━━

📅 *Date*
${document.getElementById("finalDate").textContent}

🕒 *Time*
${document.getElementById("finalTime").textContent}

🍽️ *Our Menu*
${foodText}

━━━━━━━━━━━━━━━━━━

This isn't just another day...

It's a day we'll laugh together,
eat our favorite food,
make beautiful memories,
take lots of pictures,
and enjoy every little moment together. ❤️

Thank you for choosing all of this with me.

I'm already counting the days until I can finally see your beautiful smile. 🌹

See you soon...

❤️ *Your Date Partner* ❤️`;

    const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

});