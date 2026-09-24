export const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

export const BDT_EMAIL = 'info@bdt.ru';
export const BDT_PHONE = '+7(495)788-57-67';

export const BDT_VK_URL = 'https://vk.com/natasha_and_belov';

//VK
export const BDT_VK_DOMAIN = 'natasha_and_belov';
export const VK_API_URL = '/vk-api';
export const VK_API_PUBLIC_URL = 'https://api.vk.ru/method';
export const VK_SERVICE_KEY = process.env.VK_SERVICE_KEY || '';
export const VK_VERSION = '5.199';
export const VK_PUBLIC_WALL_URL = 'https://vk.com/wall';

export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY ?? '';
export const ADMIN_VERIFICATION_KEY = process.env.NEXT_PUBLIC_ADMIN_VERIFICATION_KEY ?? '';

export const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT ?? process.env.S3_ENDPOINT ?? '';
export const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET ?? process.env.S3_BUCKET ?? '';

export const VK_LOGO_URL = `${S3_ENDPOINT}/${S3_BUCKET}/vk_logo.png`;
export const LOGO_COLOR_URL = `${S3_ENDPOINT}/${S3_BUCKET}/logo-color.jpg`;
export const LOGO_TRANSPARENT_URL = `${S3_ENDPOINT}/${S3_BUCKET}/bdt-logo.svg`;
export const TEAM_PHOTO = `${S3_ENDPOINT}/${S3_BUCKET}/team.png`;
export const POSTER_HERO_URL = `${S3_ENDPOINT}/${S3_BUCKET}/poster_bdt_hero.webp`;
export const NOT_FOUND_IMAGE = `${S3_ENDPOINT}/${S3_BUCKET}/not-found.svg`;
