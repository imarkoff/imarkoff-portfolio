"use client";

import {ComponentProps} from "react";
import {ExtendedInputProps} from "./types";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldRoot from "./components/FormFieldRoot";
import useCurrentLength from "./hooks/useCurrentLength";
import getFormFieldClassName from "./utils/getFormFieldClassName";
import FormFieldFooter from "@/components/ui/FormField/components/FormFieldFooter";
import clsx from "clsx";

type TextAreaProps = ComponentProps<'textarea'> & ExtendedInputProps;

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