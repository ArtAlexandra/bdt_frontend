import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND } from 'lexical';

import Icon from '@bdt/shared/ui/Icon';

import { FormatButton } from './FormatButton';
import ImageButton from './ImageButton';
import LinkButton from './LinkButton';
import TextCharSpacingButton from './TextCharSpacingButton';
import TextColorButton from './TextColorButton';
import TextFontFamilyButton from './TextFontFamilyButton';
import TextFontSizeButton from './TextFontSizeButton';
import TextLineHeightButton from './TextLineHeightButton';

import style from './Toolbar.module.scss';

import type { TGalleryComponent } from '../TextEditorTypes';

interface IToolbarProps {
    GalleryComponent?: TGalleryComponent;
}

function Toolbar({ GalleryComponent }: IToolbarProps) {
    return (
        <div className={style.toolbar}>
            <div className={style.toolbar__select}>
                <TextFontFamilyButton />
            </div>

            <TextFontSizeButton className={style.toolbar__button} />

            <TextLineHeightButton className={style.toolbar__button} />

            <TextCharSpacingButton className={style.toolbar__button} />

            <LinkButton format="link" className={style.toolbar__button} />

            { GalleryComponent && <ImageButton className={style.toolbar__button} GalleryComponent={GalleryComponent} /> }

            <FormatButton format="bold" command={FORMAT_TEXT_COMMAND} commandPayload="bold" className={style.toolbar__button}>
                <span className="font-bold">B</span>
            </FormatButton>

            <FormatButton format="italic" command={FORMAT_TEXT_COMMAND} commandPayload="italic" className={style.toolbar__button}>
                <em className="italic">I</em>
            </FormatButton>

            <FormatButton format="underline" command={FORMAT_TEXT_COMMAND} commandPayload="underline" className={style.toolbar__button}>
                <u className="underline">U</u>
            </FormatButton>

            <FormatButton format="strikethrough" command={FORMAT_TEXT_COMMAND} commandPayload="strikethrough" className={style.toolbar__button}>
                <Icon name="strikethrough" />
            </FormatButton>

            <TextColorButton className={style.toolbar__button} />

            <FormatButton format="quote" command={FORMAT_ELEMENT_COMMAND} commandPayload="quote" className={style.toolbar__button}>
                <Icon name="quote" />
            </FormatButton>

            <FormatButton format="uppercase" command={FORMAT_TEXT_COMMAND} commandPayload="uppercase" className={style.toolbar__button}>
                A
            </FormatButton>

            <FormatButton format="lowercase" command={FORMAT_TEXT_COMMAND} commandPayload="lowercase" className={style.toolbar__button}>
                a
            </FormatButton>

            <FormatButton format="capitalize" command={FORMAT_TEXT_COMMAND} commandPayload="capitalize" className={style.toolbar__button}>
                Aa
            </FormatButton>

            <FormatButton format="h1" command={FORMAT_ELEMENT_COMMAND} commandPayload="h1" className={style.toolbar__button}>
                H1
            </FormatButton>

            <FormatButton format="h2" command={FORMAT_ELEMENT_COMMAND} commandPayload="h2" className={style.toolbar__button}>
                H2
            </FormatButton>

            <FormatButton format="h3" command={FORMAT_ELEMENT_COMMAND} commandPayload="h3" className={style.toolbar__button}>
                H3
            </FormatButton>

            <FormatButton format="ol" command={INSERT_ORDERED_LIST_COMMAND} commandPayload="ol" className={style.toolbar__button}>
                <Icon name="orderingList" />
            </FormatButton>

            <FormatButton format="ul" command={INSERT_UNORDERED_LIST_COMMAND} commandPayload="ul" className={style.toolbar__button}>
                <Icon name="unorderingList" />
            </FormatButton>

            <FormatButton format="alignLeft" command={FORMAT_ELEMENT_COMMAND} commandPayload="left" className={style.toolbar__button}>
                <Icon name="textLeft" />
            </FormatButton>

            <FormatButton format="alignCenter" command={FORMAT_ELEMENT_COMMAND} commandPayload="center" className={style.toolbar__button}>
                <Icon name="textCenter" />
            </FormatButton>

            <FormatButton format="alignRight" command={FORMAT_ELEMENT_COMMAND} commandPayload="right" className={style.toolbar__button}>
                <Icon name="textRight" />
            </FormatButton>

            <FormatButton format="alignJustify" command={FORMAT_ELEMENT_COMMAND} commandPayload="justify" className={style.toolbar__button}>
                <Icon name="textJustify" />
            </FormatButton>
        </div>
    );
}

export default Toolbar;
