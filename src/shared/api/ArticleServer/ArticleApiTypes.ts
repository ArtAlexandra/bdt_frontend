import { ArticleType } from '@bdt/shared/config/ApiConstants';

export type TPublicArticleQueryParams = {
    page: number;
    limit: number;
    path: ArticleType;
};
