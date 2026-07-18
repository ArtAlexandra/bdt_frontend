'use client';

import { Table as AntTable } from 'antd';

import type { ColumnType } from 'antd/es/table';

export type TTableColumnType<T> = ColumnType<T>;

interface ITableProps<T> {
    data?: T[];
    columns: TTableColumnType<T>[];
    className?: string;
    loading?: boolean;
    paginationSize?: number;
    emptyText?: string;
    rowKey?: string | ((record: T) => string);

    onRowClick?: (data: T) => void;
};

function Table<T extends object>({ data, columns, className, loading, paginationSize, emptyText = 'Нет данных', rowKey = 'id', onRowClick }: ITableProps<T>) {
    const pagination = paginationSize
        ? {
            pageSize: paginationSize,
            showSizeChanger: false,
            hideOnSinglePage: true
        } : false;

    const onRow = (record: T) => {
        if (onRowClick) {
            return { onClick: () => onRowClick(record) };
        }

        return {};
    };

    return (
        <AntTable<T>
            rowKey={rowKey}
            bordered
            loading={loading}
            className={className}
            scroll={{ x: '100%' }}
            dataSource={data}
            columns={columns}
            pagination={pagination}
            onRow={onRow}
            locale={{ emptyText }}
        />
    );
}

export default Table;