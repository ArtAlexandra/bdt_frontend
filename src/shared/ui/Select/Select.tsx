import { Select as AntdSelect } from 'antd';
import clsx from 'clsx';

import Error from '@bdt/shared/ui/Error';
import Label from '@bdt/shared/ui/Label';

import { SELECT_SIZE, type TBasicOption, type TGroupOption } from './SelectTypes';

import style from './Select.module.scss';

import type { TError } from '@bdt/shared/helpers/ErrorHelpers';
import type { BaseOptionType } from 'antd/es/select';
import type { FlattenOptionData } from 'rc-select/lib/interface';

type TOptionRender = (option: FlattenOptionData<BaseOptionType>, info: { index: number }) => React.ReactNode;

type TSelectOption = TBasicOption | TGroupOption;

interface ISelectProps<T> {
    options: TSelectOption[];
    defaultValue?: T;
    className?: string;
    autoHeight?: boolean;
    disabled?: boolean;
    placeholder?: string;
    value?: T | null;
    showSearch?: boolean;
    filterOption?: boolean;
    label?: string;
    error?: TError;
    required?: boolean;
    allowClear?: boolean;
    popupMatchSelectWidth?: boolean;
    loading?: boolean;
    size?: SELECT_SIZE;
    optionRender?: TOptionRender;
    testId?: string;

    onClear?: () => void;
    onChange: (value: T) => void;
    onSearch?: (value: string) => void;
}

function Select<T extends string>({
    options,
    defaultValue,
    className,
    autoHeight,
    disabled,
    placeholder,
    value,
    showSearch = false,
    filterOption = false,
    label,
    error,
    required,
    allowClear = false,
    popupMatchSelectWidth = true,
    loading = false,
    size = SELECT_SIZE.default,
    optionRender,
    testId,
    onClear,
    onChange,
    onSearch,
}: ISelectProps<T>) {
    const selectFieldClassName = clsx(style.select__field, {
        [style.select__field_error]: error,
        [style.select__field_autoHeight]: autoHeight,
        [style.select__field_small]: size === SELECT_SIZE.small,
    });

    return (
        <div className={clsx(style.select, className)} data-testid={testId}>
            { label && <Label text={label} required={required} /> }

            <div className={selectFieldClassName}>
                <AntdSelect
                    key={String(loading)}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    options={options}
                    disabled={disabled}
                    placeholder={placeholder}
                    showSearch={showSearch}
                    filterOption={filterOption}
                    onSearch={onSearch}
                    onClear={onClear}
                    allowClear={allowClear}
                    popupMatchSelectWidth={popupMatchSelectWidth}
                    loading={loading}
                    size={size === SELECT_SIZE.small ? 'small' : 'middle'}
                    optionRender={optionRender}
                />
            </div>

            { error && <Error error={error} /> }
        </div>
    );
};

export default Select;
