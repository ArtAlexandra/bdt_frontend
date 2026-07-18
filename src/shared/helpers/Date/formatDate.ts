import dayjs, { type TDate } from './dayjs';

export type TFormat = 'DD.MM.YYYY' | 'HH:mm' | 'в HH:mm' | 'DD MMMM' | 'DD MMMM YYYY' | 'DD MMMM YYYY в HH:mm' | 'DD MMMM YYYY HH:mm' | 'DD MMMM HH:mm' | 'YYYY-MM-DD' | '«DD» MMMM YYYY г.';

export const formatDate = (value: TDate | string | Date, format: TFormat = 'DD.MM.YYYY', ianaTimezone?: string) => {
    if (ianaTimezone) return dayjs.utc(value).tz(ianaTimezone).format(format);

    return dayjs(value).format(format);
};
