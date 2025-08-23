import FormFieldMessage from "../components/FormFieldMessage";
import FormFieldLengthCounter from "../components/FormFieldLengthCounter";
import {ExtendedInputProps} from "../types";

interface InputFooterProps {
    message: ExtendedInputProps['message'];
    messageId?: string;
    maxLength?: ExtendedInputProps['maxLength'];
    length: number;
}

export default function FormFieldFooter(
    {message, messageId, maxLength, length}: InputFooterProps
) {
    return (
        <div className={"flex items-center gap-2.5"}>
            {message && messageId && (
                <FormFieldMessage message={message} messageId={messageId} />
            )}
            {maxLength && (
                <span className={"ml-auto"}>
                    <FormFieldLengthCounter
                        maxLength={maxLength}
                        currentLength={length}
                    />
                </span>
            )}
        </div>
    );
}