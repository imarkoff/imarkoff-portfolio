import FormFieldMessage from "@/components/ui/FormField/components/FormFieldMessage";
import FormFieldLengthCounter from "@/components/ui/FormField/components/FormFieldLengthCounter";
import {ExtendedInputProps} from "@/components/ui/FormField/types";

interface InputFooterProps {
    message: ExtendedInputProps['message'];
    maxLength?: ExtendedInputProps['maxLength'];
    length: number;
}

export default function FormFieldFooter(
    {message, maxLength, length}: InputFooterProps
) {
    return (
        <div className={"flex items-center gap-2.5"}>
            {message && (
                <FormFieldMessage message={message}/>
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