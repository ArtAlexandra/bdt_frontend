'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Card from '@bdt/shared/ui/Card';
import { PublicSection } from '@bdt/shared/ui/Section';

import { NEWS_ID } from '../config/Config';

import style from './VKWallSection.module.scss';

import type { TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

interface IVKWallSectionProps {
    posts: TPublicArticle[];
};

function VKWallSection({ posts }: IVKWallSectionProps) {
    const router = useRouter();

    const handleReadMore = (id: string | number) => {
        router.push(`${ROUTES.public.news.path}#post-${id}`);

        // После перехода прокручиваем к элементу
        setTimeout(() => {
            const element = document.getElementById(`post-${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    };

    return (
        <PublicSection>
            <div className={style.vkWallSection} id={NEWS_ID}>
                <h2 className={style.vkWallSection__title}>Новости</h2>

                <div className={style.vkWallSection__content}>
                    { posts.map((post, index) => {
                        return (
                            <Card post={post} onClick={() => handleReadMore(post.id)} key={`post_${index}`} />
                        );
                    }) }
                </div>

                <Button variant="secondaryOutline" size="large" href={ROUTES.public.news.path}>Смотреть все новости</Button>
            </div>
        </PublicSection>

    );
}

export default VKWallSection;
