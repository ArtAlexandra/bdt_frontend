'use client';

import { BDT_EMAIL, BDT_PHONE } from '@bdt/shared/config/AppEnvironment';

import { FooterItems } from '../config/FooterItems';

import Item from './Item';

import style from './PublicFooter.module.scss';

function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.publicFooter}>
            <div className={style.publicFooter__container}>
                <nav className={style.publicFooter__nav}>
                    { FooterItems.map((item, index) => (
                        <Item data={item} key={`footer_item_${index}`} />
                    )) }
                </nav>

                <div className={style.publicFooter__bottom}>
                    <div className={style.publicFooter__contacts}>
                        <div className={style.publicFooter__contactLink}>{ BDT_EMAIL }</div>
                        <div className={style.publicFooter__contactLink}>{ BDT_PHONE }</div>
                    </div>
                    <span className={style.publicFooter__copyright}>
                        © { currentYear } Наташа & Белов. Все права защищены.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default PublicFooter;
