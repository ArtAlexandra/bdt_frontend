'use client';

import { Steps as AntdSteps } from 'antd';
import clsx from 'clsx';

import styles from './Steps.module.scss';

type TSize = 'small' | 'default';

export interface IStep {
    title: string;
    content?: string;
    status?: 'wait' | 'process' | 'finish' | 'error';
    disabled?: boolean;
};

interface IStepProps {
    data: IStep[];
    current: number;
    size?: TSize;
    className?: string;
    direction?: 'horizontal' | 'vertical';

    onChange?: (current: number) => void;
};

function Steps({ data, current, size, className, direction, onChange }: IStepProps) {
    return (
        <div className={clsx(styles.steps, className)}>
            <AntdSteps size={size} current={current} items={data} onChange={onChange} direction={direction} />
        </div>
    );
}

export default Steps;
