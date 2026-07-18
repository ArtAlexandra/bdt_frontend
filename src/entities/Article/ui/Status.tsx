'use client';

import clsx from 'clsx';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import Icon from '@bdt/shared/ui/Icon';

import style from './Status.module.scss';

const ARTICLE_STATUS = {
    [ArticleStatus.DRAFT]: 'Черновик',
    [ArticleStatus.PUBLISHED]: 'Опубликовано',
    [ArticleStatus.ARCHIVED]: 'Архивировано',
};

interface IStatusProps {
    status: ArticleStatus;
    className?: string;
};

function Status({ status, className }: IStatusProps) {
    const statusCssClass = clsx(style.status, className, {
        [style['status_published']]: status === ArticleStatus.PUBLISHED,
        [style['status_archived']]: status === ArticleStatus.ARCHIVED,
    });

    return (
        <div className={statusCssClass}>
            <Icon className={style.status__icon} name="circle" />
            { ARTICLE_STATUS[status] }
        </div>
    );
}

export default Status;
