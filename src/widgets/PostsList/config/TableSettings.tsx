import Link from 'next/link';

import { ArticleStatus, ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import ExpandableText from '@bdt/shared/ui/ExpandableText';

import { Status } from '@bdt/entities/Article';
import { TextPreview } from '@bdt/entities/TextEditor';

import type { TArticle } from '@bdt/shared/api/Article';
import type { TUser } from '@bdt/shared/api/User';
import type { TTableColumnType } from '@bdt/shared/ui/Table';

export const getPostColumns = (path: ArticleType): TTableColumnType<TArticle>[] => {
    return [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
            render: (value, record) => {
                const href = path === ArticleType.POST ? ROUTES.admin.dashboard.posts.edit.generatePath(record.id) : ROUTES.admin.dashboard.articles.edit.generatePath(record.id);
                return <Link className="text-base" href={href}>{ value }</Link>;
            }
        },
        {
            title: 'Содержимое',
            dataIndex: 'content',
            key: 'content',
            render: (value: string) => <ExpandableText isShowButton><TextPreview data={value} /></ExpandableText>
        },
        {
            title: 'Автор',
            dataIndex: 'author',
            key: 'author',
            render: (value: TUser) => <>{ value.email }</>,

        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (value: ArticleStatus) => <Status status={value} />
        },
    ];
};