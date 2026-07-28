import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

export const sortedOptions = [
    {
        label: 'Все',
        value: ''
    },
    {
        label: 'Черновики',
        value: ArticleStatus.DRAFT
    },
    {
        label: 'Опубликованные',
        value: ArticleStatus.PUBLISHED
    },
    {
        label: 'Архивные',
        value: ArticleStatus.ARCHIVED
    }
];
