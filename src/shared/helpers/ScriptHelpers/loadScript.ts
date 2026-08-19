export interface ILoadScriptOptions {
    src: string;
    id?: string;
    /** По умолчанию: true */
    isAsync?: boolean;
    /** Вставить перед первым script в документе (как Top.Mail.Ru). По умолчанию: append в head */
    insertBeforeFirstScript?: boolean;
    /** Вызывается после загрузки скрипта. Если возвращает Promise — loadScript ждёт его (например, ymaps3.ready) */
    onLoad?: () => void | Promise<void>;
}

export function loadScript({ src, id, isAsync = true, insertBeforeFirstScript = false, onLoad }: ILoadScriptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.src = src;
        script.async = isAsync;

        if (id) {
            script.id = id;
        }

        script.onload = async () => {
            try {
                await onLoad?.();
                resolve();
            } catch (error) {
                reject(error);
            }
        };

        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };

        if (insertBeforeFirstScript) {
            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript?.parentNode) {
                firstScript.parentNode.insertBefore(script, firstScript);
            } else {
                document.head.appendChild(script);
            }
        } else {
            document.head.appendChild(script);
        }
    });
}
