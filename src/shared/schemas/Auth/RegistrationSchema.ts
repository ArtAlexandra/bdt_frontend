import { z } from 'zod';

export const registrationSchema = z
    .object({
        email: z
            .email({ message: 'Введите корректный email адрес' })
            .min(1, { message: 'Email обязателен для заполнения' })
            .max(255, { message: 'Email не может превышать 255 символов' }),

        password: z
            .string()
            .min(6, { message: 'Пароль должен содержать минимум 6 символов' })
            .max(100, { message: 'Пароль не может превышать 100 символов' }),

        confirmPassword: z
            .string()
            .min(6, { message: 'Пароль должен содержать минимум 6 символов' })
            .max(100, { message: 'Пароль не может превышать 100 символов' }),

        name: z
            .string()
            .min(1, { message: 'Имя обязательно для заполнения' })
            .max(100, { message: 'Имя не может превышать 100 символов' }),

        isAdmin: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type TRegistrationSchema = z.infer<typeof registrationSchema>;
