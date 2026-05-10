import { loadLanguage } from "./loadLanguage.js";
import { updateTexts } from "./updateTexts.js";

const STORAGE_KEY = "lang";
const DEFAULT_LANGUAGE = "en";

function closeOpenDropdowns(event) {
    const languageDropdown = document.querySelector("[data-language-dropdown]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (
        languageDropdown instanceof HTMLDetailsElement &&
        languageDropdown.open &&
        !languageDropdown.contains(event.target)
    ) {
        languageDropdown.open = false;
    }

    if (mobileMenu instanceof HTMLElement && !mobileMenu.contains(event.target)) {
        mobileMenu.querySelectorAll("[tabindex='0']").forEach((element) => {
            if (element instanceof HTMLElement && element.matches(":focus")) {
                element.blur();
            }
        });
    }
}

function updateLanguageSelectorState(lang) {
    const currentLabel = document.getElementById("language-current");

    if (currentLabel) {
        currentLabel.textContent = lang.toUpperCase();
    }

    document.querySelectorAll("[data-language-option]").forEach((option) => {
        const isActive = option.dataset.languageOption === lang;

        option.classList.toggle("text-primary", isActive);
        option.classList.toggle("font-semibold", isActive);
        option.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-language-check]").forEach((indicator) => {
        indicator.classList.toggle("text-secondary", indicator.dataset.languageCheck === lang);
        indicator.classList.toggle("opacity-100", indicator.dataset.languageCheck === lang);
        indicator.classList.toggle("opacity-0", indicator.dataset.languageCheck !== lang);
    });
}

async function applyLanguage(lang) {
    const translations = await loadLanguage(lang);
    updateTexts(translations);
    updateLanguageSelectorState(lang);
}

export async function initializeLanguageSelector() {
    const languageOptions = document.querySelectorAll("[data-language-option]");
    const savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;

    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, DEFAULT_LANGUAGE);
    }

    await applyLanguage(savedLang);

    if (languageOptions.length === 0) {
        document.addEventListener("click", closeOpenDropdowns);
        return;
    }

    languageOptions.forEach((option) => {
        option.addEventListener("click", async () => {
            const nextLang = option.dataset.languageOption;

            if (!nextLang) {
                return;
            }

            localStorage.setItem(STORAGE_KEY, nextLang);
            await applyLanguage(nextLang);
            option.closest("details")?.removeAttribute("open");
        });
    });

    document.addEventListener("click", closeOpenDropdowns);
}
