"use client"
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

type CurrencyContextType = {
    currency: string;
    setCurrency: (currency: string) => void;
};

type CurrencyProviderProps = {
    children: ReactNode;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
    const initialCurrency = isUAE ? "AED" : "EGP";
    const [currency, setCurrency] = useState<string>(initialCurrency);
    
    useEffect(() => {
        const savedCurrency = Cookies.get('currency');
        if (savedCurrency) {
            setCurrency(savedCurrency);
        } else {
            // If the cookie is not set, set it based on the subdomain
            if (isUAE) {
                // Set the currency to "AED" and save it in a cookie
                setCurrency("AED");
                Cookies.set('currency', 'AED', { expires: 365, path: '/' });
            } else {
                // Set the currency to "EGP" and save it in a cookie
                setCurrency("EGP");
                Cookies.set('currency', 'EGP', { expires: 365, path: '/' });
            }
        }
    }, [isUAE,currency]);

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
        Cookies.set('currency', newCurrency, { expires: 365, path: '/' });
    };

    const contextValue: CurrencyContextType = {
        currency,
        setCurrency: handleCurrencyChange,
    };

    return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
