import style from './ToolbarTheme.module.scss';

export const ToolbarTheme = {
    text: {
        bold: style['toolbarTheme__text-bold'],
        italic: style['toolbarTheme__text-italic'],
        underline: style['toolbarTheme__text-underline'],
        strikethrough: style['toolbarTheme__text-strikethrough'],
        uppercase: style['toolbarTheme__text-uppercase'],
        lowercase: style['toolbarTheme__text-lowercase'],
        capitalize: style['toolbarTheme__text-capitalize'],
    },
    heading: {
        h1: style['toolbarTheme__heading-h1'],
        h2: style['toolbarTheme__heading-h2'],
        h3: style['toolbarTheme__heading-h3'],
    },
    list: {
        ol: style['toolbarTheme__list-ol'],
        ul: style['toolbarTheme__list-ul'],
        listitem: style['toolbarTheme__list-listitem'],
        nested: {
            list: style['toolbarTheme__list-nested-list'],
            listitem: style['toolbarTheme__list-nested-listitem'],
        },
    },
    link: style.toolbarTheme__link,
    image: style.toolbarTheme__image,
    quote: style['toolbarTheme__quote'],
    textAlign: {
        left: style['toolbarTheme__text-align-left'],
        center: style['toolbarTheme__text-align-center'],
        right: style['toolbarTheme__text-align-right'],
        justify: style['toolbarTheme__text-align-justify'],
    },
    colors: { primary: style['toolbarTheme__colors-primary'] },
};
