import dayjs from './dayjs';

export type TFormat = 'DD.MM.YYYY' | 'DD MMMM YYYY в HH:mm';

interface IFormatUnixToDateProps {
    unixTimestamp: number;
    format: TFormat;
};

export const formatUnixToDate = ({ unixTimestamp, format }: IFormatUnixToDateProps) => {
    const value = new Date(unixTimestamp * 1000);
    return dayjs(value).format(format);
};
