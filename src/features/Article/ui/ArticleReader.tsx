'use client';

import clsx from 'clsx';

import { formatDate } from '@bdt/shared/helpers/Date';

import { LOGO_COLOR_URL } from '@bdt/shared/config/AppEnvironment';
import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import MediaCarousel from '@bdt/shared/ui/MediaCarousel';

import { getMedia } from '@bdt/entities/Article';
import { TextPreview } from '@bdt/entities/TextEditor';

import style from './ArticleReader.module.scss';

import type { TArticle } from '@bdt/shared/api/Article';

interface IArticleReaderProps {
    article: TArticle;
    isPreview?: boolean;
    className?: string;
};

function ArticleReader({ article, isPreview = false, className }: IArticleReaderProps) {
    const datePublishPost = formatDate((article.publishedAt ?? article.updatedAt), 'DD MMMM YYYY');
    const backLink = ROUTES.public.articles.index.path;
    const media = getMedia(article.images);

    return (
        <div className={clsx(style.articleReader, className)}>

            { !isPreview && <Button className={clsx(style.articleReader__button, 'my-4')} variant="link" href={backLink}><Icon name="arrowLeft" />Список статей</Button> }

            <div className={style.articleReader__content}>
                <p className={style.articleReader__date}>{ datePublishPost }</p>
                <h1 className={style.articleReader__title}>{ article.title }</h1>

                <MediaCarousel media={media} defaultImageUrl={LOGO_COLOR_URL} className={style.articleReader__media} size="big" />

                { article.content && <TextPreview data={article.content} /> }
            </div>
        </div>
    );
}

export default ArticleReader;
