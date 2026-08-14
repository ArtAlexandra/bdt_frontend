import clsx from 'clsx';

import style from './PublicSection.module.scss';

interface IPublicSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
};

function PublicSection({ children, className, id }: IPublicSectionProps) {
    return (
        <section className={clsx(style.section, className)} id={id}>
            { children }
        </section>
    );
}

export default PublicSection;
