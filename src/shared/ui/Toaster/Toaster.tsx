'use client';

import { Toaster as ToasterComponent } from 'react-hot-toast';

export default function Toaster() {
    return <ToasterComponent position="top-center" toastOptions={{ duration: 5000 }} />;
};
