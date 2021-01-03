import React, { createContext, useState } from 'react';

export const ErrorContext = createContext()

export function ErrorProvider(props) {

    const [error, setError] = useState({
        msg: null,
        status: null
    })

    const getError = (msg, status) => {
        setError(() => ({
            msg,
            status
        }))
    }

    const clearError = () => {
        setError(() => ({
            msg: null, 
            status: null
        }))
    }

    return (
        <ErrorContext.Provider value={{ error, getError, clearError }}>
            {props.children}
        </ErrorContext.Provider>
    )
}
