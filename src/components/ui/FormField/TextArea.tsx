"use client";

import {ComponentProps} from "react";
import {ExtendedInputProps} from "./types";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldRoot from "./components/FormFieldRoot";
import useCurrentLength from "./hooks/useCurrentLength";
import getFormFieldClassName from "./utils/getFormFieldClassName";
import FormFieldFooter from "@/components/ui/FormField/components/FormFieldFooter";

type TextAreaProps = ComponentProps<'textarea'> & ExtendedInputProps;

export default function TextArea(
    {label, labelIcon, state, message, maxLength, ...props}: TextAreaProps
) {
    const {
        length, handleChange
    } = useCurrentLength<HTMLTextAreaElement>(
        props.defaultValue,
        props.onChange
    );

    return (
        <FormFieldRoot>
            <FormFieldLabel
                label={label}
                labelIcon={labelIcon}
                htmlFor={props.id}
            />
            <textarea
                {...props}
                onChange={handleChange}
                className={getFormFieldClassName(state, props.className)}
            />
            <FormFieldFooter
                message={message}
                maxLength={maxLength}
                length={length}
            />
        </FormFieldRoot>
    );
}