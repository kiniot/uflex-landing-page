function getNestedValue(data, key) {
    return key.split(".").reduce((value, currentKey) => value?.[currentKey], data);
}

function updateNodeText(data) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        const value = getNestedValue(data, node.dataset.i18n);

        if (typeof value === "string") {
            node.textContent = value;
        }
    });
}

function updateNodeAttribute(data, attributeName, datasetKey) {
    document.querySelectorAll(`[${datasetKey}]`).forEach((node) => {
        const value = getNestedValue(data, node.dataset[attributeName]);

        if (typeof value === "string") {
            if (attributeName === "i18nHref") {
                node.setAttribute("href", value);
                return;
            }

            const attributeMap = {
                i18nAriaLabel: "aria-label",
                i18nAlt: "alt",
                i18nPlaceholder: "placeholder",
            };

            node.setAttribute(attributeMap[attributeName], value);
        }
    });
}

export function updateTexts(data) {
    updateNodeText(data);
    updateNodeAttribute(data, "i18nHref", "data-i18n-href");
    updateNodeAttribute(data, "i18nAriaLabel", "data-i18n-aria-label");
    updateNodeAttribute(data, "i18nAlt", "data-i18n-alt");
    updateNodeAttribute(data, "i18nPlaceholder", "data-i18n-placeholder");
}
