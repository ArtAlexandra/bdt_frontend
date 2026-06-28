'use client';

import { Skeleton as AntSkeleton } from 'antd';

export enum SkeletonType {
    Button = 'Button',
    Avatar = 'Avatar',
    Input = 'Input',
    Image = 'Image',
    Node = 'Node'
};

interface ISkeletonProps {
    type?: keyof typeof SkeletonType;
    active?: boolean;
    className?: string;
    width?: string | number;
    height?: string | number;
}

function Skeleton({ type, active = false, className, width, height }: ISkeletonProps) {
    const style = { width, height } as React.CSSProperties;

    const renderSkeleton = () => {
        switch (type) {
            case SkeletonType.Button:
                return <AntSkeleton.Button active={active} rootClassName={className} style={style} />;
            case SkeletonType.Avatar:
                return <AntSkeleton.Avatar active={active} rootClassName={className} style={style} />;
            case SkeletonType.Image:
                return <AntSkeleton.Image active={active} rootClassName={className} style={style} />;
            case SkeletonType.Input:
                return <AntSkeleton.Input active={active} rootClassName={className} style={style} />;
            case SkeletonType.Node:
            default:
                return <AntSkeleton.Node active={active} rootClassName={className} style={style} />;
        }
    };

    return renderSkeleton();
}

export default Skeleton;
