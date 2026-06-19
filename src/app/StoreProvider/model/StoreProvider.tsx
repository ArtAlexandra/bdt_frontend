'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, TAppStore } from './Store';

interface IStoreProviderProps {
    children: React.ReactNode
}

export default function StoreProvider({ children }: IStoreProviderProps) {
    const storeRef = useRef<TAppStore | null>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{ children }</Provider>;
}
