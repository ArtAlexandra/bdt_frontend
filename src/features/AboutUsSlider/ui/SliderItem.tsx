'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Icon from '@bdt/shared/ui/Icon';

import style from './SliderItem.module.scss';

import type { TSliderData } from '../config/SliderData';

interface ISliderItemProps {
    data: TSliderData;

    onClick: () => void;
    onHover: () => void;
};

function SliderItem({ data, onClick, onHover }: ISliderItemProps) {
    const { title, items, iconSrc } = data;
    const router = useRouter();

    const handleClickItem = (url: string) => {
        if (!url) return;

        router.push(url);
    };

    return (
        <div onClick={onClick} onMouseEnter={onHover} onFocus={onHover} className={style.sliderItem}>
            <div className={style.sliderItem__content}>
                <Image src={iconSrc} alt={title} width={64} height={64} priority className={style.sliderItem__icon} />
                <div className={style.sliderItem__title}>{ title }</div>
                <div className={style.sliderItem__list}>
                    { items.map((item, index) => {
                        return <div key={`slider-item-${item.url}-${index}`} onClick={() => handleClickItem(item.url)} className={style.sliderItem__listItem}><Icon name="arrowRight" className={style['sliderItem__listItem-icon']} /> { item.title }</div>;
                    }) }
                </div>
            </div>
        </div>
    );
}

export default SliderItem;
