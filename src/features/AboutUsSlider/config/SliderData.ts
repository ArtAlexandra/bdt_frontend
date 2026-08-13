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
        imageSrc: 'https://s3.firstvds.ru/bdt/aboutUs/about-us-1.png',
        iconSrc: 'https://s3.firstvds.ru/bdt/aboutUs/airplane.svg',
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
        imageSrc: 'https://s3.firstvds.ru/bdt/aboutUs/about-us-2.png',
        iconSrc: 'https://s3.firstvds.ru/bdt/aboutUs/car.svg',
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
        imageSrc: 'https://s3.firstvds.ru/bdt/aboutUs/about-us-3.png',
        iconSrc: 'https://s3.firstvds.ru/bdt/aboutUs/angelfish.svg',
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
        imageSrc: 'https://s3.firstvds.ru/bdt/aboutUs/about-us-4.png',
        iconSrc: 'https://s3.firstvds.ru/bdt/aboutUs/apistogramma.svg',
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
