'use client';

import { Carousel as AntdCarousel } from 'antd';

interface ICarouselProps {
    autoplay?: boolean;
    children?: React.ReactNode;
    className?: string;
};

function Carousel({ autoplay = false, children, className }: ICarouselProps) {
    return (
        <AntdCarousel autoplay={autoplay} rootClassName={className}>
            { children }
        </AntdCarousel>
    );
};

export default Carousel;
