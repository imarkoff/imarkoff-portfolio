"use client";

import {ComponentProps} from "react";
import {ExtendedInputProps} from "./types";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldRoot from "./components/FormFieldRoot";
import FormFieldFooter from "./components/FormFieldFooter";
import useCurrentLength from "./hooks/useCurrentLength";
import getFormFieldClassName from "./utils/getFormFieldClassName";

type InputProps = ComponentProps<'input'> & ExtendedInputProps;

export default function Input(
    {label, labelIcon, state = 'default', message, maxLength, ...props}: InputProps
) {
    const { 
        length, handleChange
    } = useCurrentLength<HTMLInputElement>(
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
            <input
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