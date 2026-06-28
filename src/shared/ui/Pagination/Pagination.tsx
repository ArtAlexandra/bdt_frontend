import { memo } from 'react';
import { Pagination as AntPagination } from 'antd';
import clsx from 'clsx';

import { useResponsive } from '@bdt/shared/helpers/ResponsiveHelpers';

import style from './Pagination.module.scss';

type TAlign = 'start' | 'center' | 'end';
type TSize = 'small' | 'large';

interface IBasicPaginationProps {
    className?: string;
    currentPage: number;
    totalPages?: number;
    pageSize: number;
    align?: TAlign;
    size?: TSize;
    pageSizeOptions?: number[];
    showSizeChanger?: boolean;

    onChangePage: (page: number, pageSize: number) => void;
};

const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 75, 100];

function Pagination({ className, currentPage, totalPages = 1, pageSize, align, size, pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS, showSizeChanger, onChangePage }: IBasicPaginationProps) {
    const { isMobile } = useResponsive();

    const handleChangePage = (pageNew: number, pageSizeNew: number) => {
        if (pageSizeNew != pageSize) pageNew = 1;
        onChangePage(pageNew, pageSizeNew);
    };

    return (
        <div className={clsx(className, style.paginationContainer)}>
            <AntPagination
                align={align}
                current={currentPage}
                simple={isMobile}
                total={totalPages * pageSize}
                pageSize={pageSize}
                size={size}
                onChange={handleChangePage}
                showQuickJumper={false}
                showSizeChanger={showSizeChanger}
                pageSizeOptions={pageSizeOptions}
            />
        </div>
    );
}

export default memo(Pagination);
