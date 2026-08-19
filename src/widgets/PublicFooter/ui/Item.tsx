'use client';

import { useRouter } from 'next/navigation';

import { navigateWithHash } from '@bdt/shared/helpers/URL';

import style from './Item.module.scss';

import type { TFooterItem } from '../config/FooterItems';

interface IItemProps {
    data: TFooterItem;
};

function Item({ data }: IItemProps) {
    const router = useRouter();

    const handlePushToPage = () => {
        navigateWithHash(router, data.url);
    };

    return <div onClick={handlePushToPage} className={style.item}>{ data.title }</div>;
}

export default Item;
