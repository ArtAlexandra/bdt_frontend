import { loadScript } from '@bdt/shared/helpers/ScriptHelpers';

const TAG_JS = 'https://mc.yandex.ru/metrika/tag.js';

let scriptPromise: Promise<void> | null = null;
let mainCounter: IYandexMetrikaCounter | null = null;

function ensureScript(): Promise<void> {
    if (scriptPromise) return scriptPromise;

    scriptPromise = window.Ya?.Metrika2
        ? Promise.resolve()
        : loadScript({ src: TAG_JS });

    return scriptPromise;
}

export type TMetrikaOptions = Omit<IYandexMetrikaOptions, 'id'>;

export function initCounter(id: number, options: TMetrikaOptions): { cancel: () => void; init: Promise<IYandexMetrikaCounter | null> } {
    let cancelled = false;
    let resolve: (counter: IYandexMetrikaCounter | null) => void;
    const init = new Promise<IYandexMetrikaCounter | null>((res) => { resolve = res; });

    const setup = () => {
        if (cancelled) {
            resolve(null);
            return;
        }

        const YandexMetrikaConstructor = window.Ya?.Metrika2;
        if (!YandexMetrikaConstructor) {
            resolve(null);
            return;
        }

        try {
            resolve(new YandexMetrikaConstructor({ id, ...options }));
        } catch (error) {
            console.warn(`Metrika: failed to init counter ${id}`, error);
            resolve(null);
        }
    };

    if (window.Ya?.Metrika2) {
        setup();
    } else {
        ensureScript().then(setup);
    }

    return {
        cancel: () => { cancelled = true; },
        init,
    };
}

export function setMainCounter(counter: IYandexMetrikaCounter | null): void {
    mainCounter = counter;
}

export function reachGoal(goal: string): void {
    try {
        mainCounter?.reachGoal(goal);
    } catch (error) {
        console.error(`Error sending reach goal to main counter: ${goal}`, error);
    }
}
