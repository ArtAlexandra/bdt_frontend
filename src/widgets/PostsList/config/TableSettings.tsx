import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import { Status } from '@bdt/entities/Article';
import { TextPreview } from '@bdt/entities/TextEditor';

import type { TArticle } from '@bdt/shared/api/Article';
import type { TUser } from '@bdt/shared/api/User';
import type { TTableColumnType } from '@bdt/shared/ui/Table';

export const COLUMNS: TTableColumnType<TArticle>[] = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        render: (value: string) => <TextPreview data={value} />
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
