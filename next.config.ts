import { PUBLIC_URL } from '@bdt/shared/config/AppEnvironment';

import type { NextConfig } from 'next';

const cspSources = {
    scriptSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'blob:',
    ],
    styleSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'https:',
    ],
    fontSrc: [
        '\'self\'',
        'https://fonts.gstatic.com',
    ],
    imgSrc: [
        '\'self\'',
        'data:',
        'blob:',
        'https:',
    ],
    connectSrc: [
        '\'self\'',
        'wss:',
        'https:',
        PUBLIC_URL,
    ],
    frameSrc: [
        '\'self\'',
        'blob:',
        'https:',
    ],
    mediaSrc: [
        '\'self\'',
        'blob:',
        'data:',
        'https:',
    ],
};

const buildCSP = () => {
    return [
        'default-src \'self\' blob: data:',
        `script-src ${cspSources.scriptSrc.join(' ')}`,
        `script-src-elem ${cspSources.scriptSrc.join(' ')}`,
        `style-src ${cspSources.styleSrc.join(' ')}`,
        `style-src-elem ${cspSources.styleSrc.join(' ')}`,
        `font-src ${cspSources.fontSrc.join(' ')}`,
        `img-src ${cspSources.imgSrc.join(' ')}`,
        `connect-src ${cspSources.connectSrc.join(' ')}`,
        `frame-src ${cspSources.frameSrc.join(' ')}`,
        `frame-ancestors ${cspSources.frameSrc.join(' ')}`,
        `media-src ${cspSources.mediaSrc.join(' ')}`,
        'object-src \'none\'',
        'base-uri \'self\'',
        'form-action \'self\'',
        'upgrade-insecure-requests',
    ].join('; ');
};

const skipChecks = process.env.SKIP_CHECKS === 'true';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    ...(skipChecks ? {
        typescript: { ignoreBuildErrors: true },
        eslint: { ignoreDuringBuilds: true },
    } : {}),
    distDir: 'out',
    images: { unoptimized: true },
    // Настройки только для production сборки
    ...(process.env.NODE_ENV === 'production' ? {
        output: 'standalone',
        async headers() {
            return [{
                source: '/(.*)',
                headers: [
                    // Базовые заголовки безопасности
                    {
                        key: 'Content-Security-Policy',
                        value: buildCSP(),
                    },
                    // Permissions Policy для контроля доступа к API
                    {
                        key: 'Permissions-Policy',
                        value: [
                            'autoplay=*', // для автовоспроизведения видео-рекламы
                        ].join(', ')
                    },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            }];
        },
    } : {}),
};

export default nextConfig;
