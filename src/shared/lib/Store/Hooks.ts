'use client';

import { useDispatch, useSelector, useStore } from 'react-redux';

import type { TAppDispatch, TAppStore, TRootState } from '@bdt/app/StoreProvider';

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
export const useAppStore = useStore.withTypes<TAppStore>();
