'use client';

import { Popover as AntdPopover } from 'antd';

type TPlacement = 'top' | 'bottom' | 'right' | 'left' | 'topLeft' | 'topRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'bottomLeft' | 'bottomRight';

type TTriger = 'click' | 'hover' | 'contextMenu';

interface IBasicPopoverProps {
    children?: React.ReactNode;
    content: React.JSX.Element | string;
    placement: TPlacement;
    title?: string;
    trigger?: TTriger;
    arrow?: boolean;
    open?: boolean;
    className?: string;

    onOpenChange?: (open: boolean) => void;
};

function Popover({ children, content, title, placement, trigger, arrow, open, className, onOpenChange }: IBasicPopoverProps) {
    return (
        <AntdPopover content={content} title={title} trigger={trigger || 'click'} placement={placement} arrow={arrow} open={open} onOpenChange={onOpenChange} rootClassName={className}>
            { children }
        </AntdPopover>
    );
}

export default Popover;
