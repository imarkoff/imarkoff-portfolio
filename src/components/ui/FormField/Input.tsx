"use client";

import {ComponentProps} from "react";
import {ExtendedInputProps} from "./types";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldRoot from "./components/FormFieldRoot";
import FormFieldFooter from "./components/FormFieldFooter";
import useCurrentLength from "./hooks/useCurrentLength";
import clsx from "clsx";

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
        <FormFieldRoot state={state}>
            <FormFieldLabel
                label={label}
                labelIcon={labelIcon}
                htmlFor={props.id}
            />
            <input
                {...props}
                onChange={handleChange}
                className={clsx("input", props.className)}
            />
            <FormFieldFooter
                message={message}
                maxLength={maxLength}
                length={length}
            />
        </FormFieldRoot>
    );
}