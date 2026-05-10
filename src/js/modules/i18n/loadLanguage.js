export async function loadLanguage(lang) {
    try {
        const module = await import(`../../../locales/${lang}.json`);
        return module.default
    } catch (err) {
        console.error(`Language '${lang}' not found. Falling back to English`);
        const fallback = await import('../../../locales/en.json');
        return fallback.default;
    }
}