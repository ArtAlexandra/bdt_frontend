import { S3_BUCKET, S3_ENDPOINT } from '@bdt/shared/config/AppEnvironment';

type TItemsSlider = {
    title: string;
    url: string;
};

export type TSliderData = {
    id: string;
    title: string;
    imageSrc: string;
    iconSrc: string;
    items: TItemsSlider[];
    url?: string;
};

export const SliderData: TSliderData[] = [
    {
        id: 'imported-products',
        title: 'Импортная продукция',
        imageSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/about-us-1.png`,
        iconSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/airplane.svg`,
        items: [
            {
                title: 'Пункт 1 ИП',
                url: ''
            },
            {
                title: 'Пункт 2 ИП',
                url: ''
            },
            {
                title: 'Пункт 3 ИП',
                url: ''
            },
        ]
    },
    {
        id: 'russian-products',
        title: 'Продукция РФ',
        imageSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/about-us-2.png`,
        iconSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/car.svg`,
        items: [
            {
                title: 'Пункт 1 П',
                url: ''
            },
            {
                title: 'Пункт 2 П',
                url: ''
            },
            {
                title: 'Пункт 3 П',
                url: ''
            },
        ]
    },
    {
        id: 'angelfish',
        title: 'Разведение скалярий',
        imageSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/about-us-3.png`,
        iconSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/angelfish.svg`,
        items: [
            {
                title: 'Пункт 1 РC',
                url: ''
            },
            {
                title: 'Пункт 2 РC',
                url: ''
            },
            {
                title: 'Пункт 3 РC',
                url: ''
            },
        ]
    },
    {
        id: 'apistogramma',
        title: 'Разведение апистрограмм',
        imageSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/about-us-4.png`,
        iconSrc: `${S3_ENDPOINT}/${S3_BUCKET}/aboutUs/apistogramma.svg`,
        items: [
            {
                title: 'Пункт 1 РА',
                url: ''
            },
            {
                title: 'Пункт 2 РА',
                url: ''
            },
            {
                title: 'Пункт 3 РА',
                url: ''
            },
        ]
    }
];
