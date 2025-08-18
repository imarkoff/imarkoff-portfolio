import {ReactNode} from "react";
import clsx from "clsx";

interface InputMessageProps {
    message: ReactNode;
    state?: 'default' | 'error' | 'success';
}

export default function FormFieldMessage(
    {message, state = 'default'}: InputMessageProps
) {
    return (
        <span className={clsx(
            "input-message",
            {
                "error": state === 'error',
                "success": state === 'success'
            }
        )}>
            {message}
        </span>
    );
}