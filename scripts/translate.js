const translationPath = {
    "fr": "./src/locales/fr.json",
    "en": "./src/locales/en.json"
};

const translateButton = document.getElementById("translate");
const flag = document.getElementById("flag");

const translations = {};

async function loadCache() {
    const fetchPromises = Object.keys(translationPath).map(lang => {
        return fetch(translationPath[lang])
            .then(response => response.json())
            .then(data => {
                translations[lang] = data;
            });
    });

    await Promise.all(fetchPromises);
}

function loadLanguage(lang) {
    const elements = document.querySelectorAll("[translation-key]");
    elements.forEach(element => {
        const key = element.getAttribute("translation-key");
        element.textContent = translations[lang][key];
    });

    if (lang === "en") {
        flag.classList.remove("fi-fr");
        flag.classList.add("fi-gb");
    } else if (lang === "fr") {
        flag.classList.remove("fi-gb");
        flag.classList.add("fi-fr");
    }
}

function toggleLanguage() {
    const lang = localStorage.getItem("lang") || "en";
    const newLang = lang === "en" ? "fr" : "en";
    localStorage.setItem("lang", newLang);
    loadLanguage(newLang);
}

const savedLang = localStorage.getItem("lang") || "en";

translateButton.addEventListener("click", toggleLanguage);

loadCache().then(() => {
    loadLanguage(savedLang);
});


function getTranslation(key) {
    return translations[localStorage.getItem("lang") || "en"][key];
}