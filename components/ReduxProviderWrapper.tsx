"use client"
import { Provider } from "react-redux"
import { store } from '@/app/state/store'


export const ReduxProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}