"use client";

import clsx from "clsx";
import {ComponentProps} from "react";
import {ExtendedInputProps} from "./types";
import FormFieldRoot from "./components/FormFieldRoot";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldFooter from "./components/FormFieldFooter";
import useCurrentLength from "./hooks/useCurrentLength";

export type TextAreaProps = ComponentProps<'textarea'> & ExtendedInputProps;

export default function TextArea(
    {label, labelIcon, state = "default", message, maxLength, ...props}: TextAreaProps
) {
    const {
        length, handleChange
    } = useCurrentLength<HTMLTextAreaElement>(
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
            <textarea
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