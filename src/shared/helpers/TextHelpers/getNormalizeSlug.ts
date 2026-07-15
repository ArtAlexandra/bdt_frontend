import slugify from 'slugify';

export function getNormalizeSlug(value?: string): string {
    if (!value) return '';

    return slugify(value, {
        lower: true,
        strict: true,
        trim: true,
        locale: 'ru',
    })
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
