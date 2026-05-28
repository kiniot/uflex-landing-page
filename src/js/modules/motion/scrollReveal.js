const REVEAL_SELECTOR = "[data-reveal], .card";
const REVEAL_CLASS = "reveal";
const VISIBLE_CLASS = "is-visible";
const MAX_STAGGER_STEPS = 4;
const STAGGER_MS = 90;

function staggerDelayFor(element) {
    const siblings = Array.from(element.parentElement?.children ?? []).filter((child) =>
        child.matches(REVEAL_SELECTOR)
    );
    const index = siblings.indexOf(element);

    return index > 0 ? Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS : 0;
}

export function initializeScrollReveal() {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);

    if (targets.length === 0) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        targets.forEach((element) => element.classList.add(REVEAL_CLASS, VISIBLE_CLASS));
        return;
    }

    targets.forEach((element) => {
        element.classList.add(REVEAL_CLASS);

        const delay = staggerDelayFor(element);

        if (delay > 0) {
            element.style.transitionDelay = `${delay}ms`;
        }
    });

    const observer = new IntersectionObserver(
        (entries, instance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(VISIBLE_CLASS);
                    instance.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((element) => observer.observe(element));
}
