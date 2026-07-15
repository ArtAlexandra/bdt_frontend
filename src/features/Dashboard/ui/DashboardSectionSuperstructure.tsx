import style from './DashboardSectionSuperstructure.module.scss';

interface IDashboardSectionSuperstructureProps {
    children: React.ReactNode;
};

function DashboardSectionSuperstructure({ children }: IDashboardSectionSuperstructureProps) {
    return (
        <div className={style.sectionSuperstructure}>
            { children }
        </div>
    );
}

export default DashboardSectionSuperstructure;
