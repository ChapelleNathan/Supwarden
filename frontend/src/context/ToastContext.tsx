import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastOptions {
    bg?: string,
    delay?: number,
    autohide?: boolean
}

interface ToastItem extends ToastOptions {
    id: number,
    message: string
}

interface ToastContextType {
    addToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if(!context) {
        throw new Error('useToast must be within a ToastProvider');
    }

    return context;
}

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({children}: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    console.log(children);
    
    const addToast = useCallback((message: string, options: ToastOptions = {}) => {
        setToasts((prevToasts) => [
            ...prevToasts,
            {id: Date.now(), message, ...options},
        ])
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
    }, [])

    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            <ToastContainer position="bottom-end" className="p-3">
                {toasts.map(({id, message, ...rest}) => (
                    <Toast key={id} onClose={() => removeToast(id)} {...rest}>
                        <Toast.Header className="d-flex justify-content-between">
                            Supwarden
                        </Toast.Header>
                        <Toast.Body>
                            {message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}