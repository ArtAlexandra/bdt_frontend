import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import style from './DashboardHead.module.scss';

interface IDashboardHeadProps {
    title: string;
    backLink?: string;
};

function DashboardHead({ title, backLink }: IDashboardHeadProps) {
    return (
        <div className={style.dashboardHead}>
            { backLink && <Button className={style.dashboardHead__backLink} variant="link" href={backLink}><Icon name="arrowLeft" /></Button> }
            <h1 className={style.dashboardHead__title}>{ title }</h1>
        </div>
    );
}

export default DashboardHead;
