'use client';

import Button from '@bdt/shared/ui/Button';

import { mapArticleToPublic } from '@bdt/entities/Article';

import PostMediaViewer from '@bdt/features/PostMediaViewer';

import type { TArticle } from '@bdt/shared/api/Article';

interface IPreviewSectionProps {
    article: TArticle;

    onClick: () => void;
};

function PreviewSection({ article, onClick }: IPreviewSectionProps) {
    const post = mapArticleToPublic(article);
    return (
        <>
            <PostMediaViewer post={post} id={article.id} className="max-w-[900px]" />
            <Button variant="primary" onClick={onClick} className="ml-auto">Продолжить</Button>
        </>
    );
}

export default PreviewSection;
