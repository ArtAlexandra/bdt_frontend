import clsx from 'clsx';

import { getApiErrorMessage, type TError } from '@bdt/shared/helpers/ErrorHelpers';

import style from './Error.module.scss';

interface IBaseErrorProps {
    className?: string;
    error?: TError | unknown;
}

function BaseError({ className, error }: IBaseErrorProps) {
    return error ? <div className={clsx(style.error, className)} data-testid="field-error">{ getApiErrorMessage(error) }</div> : null;
}

export default BaseError;
