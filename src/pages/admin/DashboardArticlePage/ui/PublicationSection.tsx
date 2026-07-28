'use client';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import { Status } from '@bdt/entities/Article';

import PostArchivedForm from './PostArchivedForm';
import PostDraftForm from './PostDraftForm';
import PostPublishedForm from './PostPublishedForm';

import type { TArticle } from '@bdt/shared/api/Article';

interface IPublicationSectionProps {
    post: TArticle;

    onSuccess: () => void;
};

function PublicationSection({ post, onSuccess }: IPublicationSectionProps) {
    return (
        <>
            <Status status={post.status} className="mb-4" />

            { post.status === ArticleStatus.DRAFT && <PostDraftForm post={post} onSuccess={onSuccess} /> }

            { post.status === ArticleStatus.PUBLISHED && <PostPublishedForm post={post} onSuccess={onSuccess} /> }

            { post.status === ArticleStatus.ARCHIVED && <PostArchivedForm post={post} onSuccess={onSuccess} /> }
        </>
    );
}

export default PublicationSection;
