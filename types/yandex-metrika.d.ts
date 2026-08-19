declare global {
    interface IYandexMetrikaOptions {
        id: number;
        defer?: boolean;
        webvisor?: boolean;
        clickmap?: boolean;
        trackLinks?: boolean;
        accurateTrackBounce?: boolean;
    }

    interface IYandexMetrikaCounter {
        hit(url: string, options?: Record<string, unknown>): void;
        reachGoal(goal: string, params?: Record<string, unknown>): void;
    }

    interface IYandexMetrikaConstructor {
        new (options: IYandexMetrikaOptions): IYandexMetrikaCounter;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Window {
        Ya?: {
            Metrika2?: IYandexMetrikaConstructor;
        };
    }
}

export {};
