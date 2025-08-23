import {ReactNode} from "react";

interface InputMessageProps {
    message: ReactNode;
    messageId: string;
}

export default function FormFieldMessage(
    {message, messageId}: InputMessageProps
) {
    return (
        <span
            id={messageId}
            className={"form-field-message"}
        >
            {message}
        </span>
    );
}