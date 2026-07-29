import clsx from 'clsx';

import style from './PublicSection.module.scss';

interface IPublicSectionProps {
    className?: string;
    children: React.ReactNode;
};

function PublicSection({ children, className }: IPublicSectionProps) {
    return (
        <section className={clsx(style.section, className)}>
            { children }
        </section>
    );
}

export default PublicSection;
