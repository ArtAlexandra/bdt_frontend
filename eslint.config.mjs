import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'public/sw*',
            'next-env.d.ts',
            '**/*.css',
            '**/*.scss',
        ],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json',
            },
            globals: {
                React: 'readonly',
                JSX: 'readonly',
                ...globals.browser,
                ...globals.node,  
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'simple-import-sort': simpleImportSort,
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            '@next/next': nextPlugin,
        },
        rules: {
            // Базовые правила
            ...js.configs.recommended.rules,
            
            // TypeScript правила
            ...tsPlugin.configs.recommended.rules,
            
            // React правила (кроме react-in-jsx-scope)
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-curly-spacing': ['error', {
                when: 'never',
                children: { when: 'always' },
                attributes: { when: 'never' },
            }],
            'react/display-name': 'off',
            
            // React Hooks правила
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            
            // Next.js правила
            ...nextPlugin.configs.recommended.rules,
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            
            // Сортировка импортов
            'simple-import-sort/imports': ['error', {
                groups: [
                    ['^react', '^next', '^@?\\w'],
                    ['^@bdt/shared/*'],
                    ['^@bdt/shared/config/*'],
                    ['^@bdt/shared/ui/*'],
                    ['^@bdt/entities/*'],
                    ['^@bdt/features/*'],
                    ['^@bdt/widgets/*'],
                    ['^@bdt/pages/*'],
                    ['^@bdt/app/*'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ['^.+\\.?(scss)$', '^.+\\.?(css)$'],
                    ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
                ],
            }],
            
            // Стиль кода
            'indent': ['error', 4, { SwitchCase: 1 }],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'semi': ['error', 'always'],
            'no-console': ['warn', { allow: ['error', 'warn'] }],
            'no-duplicate-imports': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'object-shorthand': ['error', 'always'],
            'space-infix-ops': 'warn',
            'space-before-blocks': 'error',
            'block-spacing': 'error',
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            'curly': ['error', 'multi-line', 'consistent'],
            'no-else-return': ['error', { allowElseIf: false }],
            
            // TypeScript специфичные
            '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { 
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_' 
            }],
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'typeAlias', format: ['PascalCase'], custom: { regex: '^T[A-Z]', match: true } },
                { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true } },
            ],
            '@typescript-eslint/triple-slash-reference': 'off',
        },
    },
];