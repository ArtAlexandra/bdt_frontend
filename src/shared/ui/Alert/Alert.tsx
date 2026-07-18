import { Alert as AlertAntd } from 'antd';

import { getApiErrorMessage, type TError } from '@bdt/shared/helpers/ErrorHelpers';

export type TTypeAlert = 'warning' | 'error' | 'info' | 'success';

interface IBasicAlertProps {
    message?: string | React.ReactNode;
    error?: TError;
    description?: string | React.ReactNode;
    type: TTypeAlert;
    showIcon?: boolean;
    closable?: boolean;
    className?: string;

    onClose?: () => void;
};

function Alert({ message, error, description, type, showIcon, closable, className, onClose }: IBasicAlertProps) {
    const errorMessage = getApiErrorMessage(error);

    const closableConfig = closable ? { onClose } : (closable ?? false);

    return (
        <div className={className}>
            <AlertAntd
                title={message || errorMessage}
                description={description}
                type={type}
                showIcon={showIcon}
                closable={closableConfig}
            />
        </div>
    );
}

export default Alert;
