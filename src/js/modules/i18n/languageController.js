import { loadLanguage } from "./loadLanguage.js";
import { updateTexts } from "./updateTexts.js";

const STORAGE_KEY = "lang";
const DEFAULT_LANGUAGE = "en";

function blurFocusedWithin(container, event) {
    if (!(container instanceof HTMLElement) || container.contains(event.target)) {
        return;
    }

    container.querySelectorAll("[tabindex='0']").forEach((element) => {
        if (element instanceof HTMLElement && element.matches(":focus")) {
            element.blur();
        }
    });
}

function closeOpenDropdowns(event) {
    blurFocusedWithin(document.querySelector("[data-language-dropdown]"), event);
    blurFocusedWithin(document.querySelector("[data-mobile-menu]"), event);
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
    document.dispatchEvent(new CustomEvent("language:changed", {
        detail: { lang, translations }
    }));
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

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        });
    });

    document.addEventListener("click", closeOpenDropdowns);
}
