const DEFAULT_PERIOD = "monthly";
const DEFAULT_CURRENCY = "pen";

const state = {
    period: DEFAULT_PERIOD,
    currency: DEFAULT_CURRENCY,
    translations: null,
};

function setToggleState(selector, activeValue, datasetKey) {
    document.querySelectorAll(selector).forEach((button) => {
        const isActive = button.dataset[datasetKey] === activeValue;

        button.classList.toggle("bg-primary", isActive);
        button.classList.toggle("text-primary-content", isActive);
        button.classList.toggle("shadow-sm", isActive);
        button.classList.toggle("bg-transparent", !isActive);
        button.classList.toggle("text-base-content/75", !isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function getPriceLabel(pricingConfig) {
    const price = pricingConfig?.prices?.[state.period]?.[state.currency];

    if (!price) {
        return "";
    }

    return price;
}

function getPriceSuffix(pricingConfig) {
    return pricingConfig?.suffixes?.[state.period]?.[state.currency] ?? "";
}

function getMessage(pricingConfig, messageKey) {
    return pricingConfig?.messages?.[messageKey]?.[state.currency] ?? "";
}

function updateTextTarget(target, value) {
    const node = document.querySelector(`[data-pricing-value="${target}"]`);

    if (node && typeof value === "string") {
        node.textContent = value;
    }
}

function renderPlan(planKey) {
    const pricingConfig = state.translations?.pricing?.cards?.[planKey];

    if (!pricingConfig) {
        return;
    }

    updateTextTarget(`${planKey}-recurring-price`, getPriceLabel(pricingConfig));
    updateTextTarget(`${planKey}-recurring-suffix`, getPriceSuffix(pricingConfig));
    updateTextTarget(`${planKey}-recurring-note`, getMessage(pricingConfig, "recurring"));
    updateTextTarget(`${planKey}-kit-summary`, getMessage(pricingConfig, "kitSummary"));
    updateTextTarget(`${planKey}-kit-base-detail`, getMessage(pricingConfig, "kitBaseDetail"));
    updateTextTarget(`${planKey}-kit-additional-detail`, getMessage(pricingConfig, "kitAdditionalDetail"));
}

function renderPricing() {
    if (!state.translations?.pricing) {
        return;
    }

    setToggleState("[data-pricing-period]", state.period, "pricingPeriod");
    setToggleState("[data-pricing-currency]", state.currency, "pricingCurrency");

    renderPlan("pilot");
    renderPlan("professional");
    renderPlan("enterprise");
}

function attachToggleListeners() {
    document.querySelectorAll("[data-pricing-period]").forEach((button) => {
        button.addEventListener("click", () => {
            const nextPeriod = button.dataset.pricingPeriod;

            if (!nextPeriod || nextPeriod === state.period) {
                return;
            }

            state.period = nextPeriod;
            renderPricing();
        });
    });

    document.querySelectorAll("[data-pricing-currency]").forEach((button) => {
        button.addEventListener("click", () => {
            const nextCurrency = button.dataset.pricingCurrency;

            if (!nextCurrency || nextCurrency === state.currency) {
                return;
            }

            state.currency = nextCurrency;
            renderPricing();
        });
    });
}

export function initializePricingControls() {
    attachToggleListeners();

    document.addEventListener("language:changed", (event) => {
        state.translations = event.detail?.translations ?? null;
        renderPricing();
    });
}
