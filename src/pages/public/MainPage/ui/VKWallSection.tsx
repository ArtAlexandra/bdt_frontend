'use client';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';

import VKCard from './VKCard';

import style from './VKWallSection.module.scss';

import type { TPost } from '@bdt/entities/VK';

interface IVKWallSectionProps {
    posts: TPost[];
};

function VKWallSection({ posts }: IVKWallSectionProps) {
    return (
        <div className={style.vkWallSection}>
            <h2 className={style.vkWallSection__title}>Новости</h2>

            <div className={style.vkWallSection__content}>
                { posts.map((post, index) => {
                    return (
                        <VKCard post={post} key={`vk_post_${index}`} />
                    );
                }) }
            </div>

            <Button variant="secondaryOutline" size="large" href={ROUTES.public.news.path}>Смотреть все новости</Button>
        </div>
    );
}

export default VKWallSection;
