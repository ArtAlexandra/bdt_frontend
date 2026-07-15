import clsx from 'clsx';

import style from './DashboardSection.module.scss';

type TDashboardSectionVariant = 'highlight';

interface IDashboardSectionProps {
    className?: string;
    children: React.ReactNode;
    variant?: TDashboardSectionVariant;
};

function DashboardSection({ children, className, variant }: IDashboardSectionProps) {
    const cssClassName = clsx(style.section, className, { [style.section_highlight]: variant === 'highlight' });

    return <section className={cssClassName}>{ children }</section>;
}

export default DashboardSection;
