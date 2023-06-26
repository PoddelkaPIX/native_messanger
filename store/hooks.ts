import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { useEffect, useState } from 'react'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Ожидание прекращения ввода строки в input
export const useDebounce = (value: string, delay: number = 300): string => {
    const [debounced, setDebounced] = useState(value)
    useEffect(()=>{
        const handler = setTimeout(()=>setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debounced
}