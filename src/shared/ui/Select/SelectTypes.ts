export enum SELECT_SIZE {
    default = 'default',
    small = 'small',
}

export type TBasicOption = {
    value: string;
    label: React.ReactNode | string;
    disabled?: boolean;
};

export type TGroupOption = {
    label: string;
    options: TBasicOption[];
};
