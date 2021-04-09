interface MediaQueryEvent {
    matches: boolean,
};

import { readable } from 'svelte/store';

function createReadable(query: string) {
    return readable(window.matchMedia(query).matches, (set) => {
        const updatePreference = (event: MediaQueryEvent) => {
            set(event.matches);
        };
        const mediaQueryList = window.matchMedia(query);
        mediaQueryList.addEventListener('change', updatePreference);
        return () => {
            mediaQueryList.removeEventListener('change', updatePreference);
        };
    });
}

export const reducedMotion = createReadable('(prefers-reduced-motion: reduce)');
export const darkMode = createReadable('(prefers-dark-mode: dark)');
