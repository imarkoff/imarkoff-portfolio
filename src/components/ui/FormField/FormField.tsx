"use client";

import { ComponentProps, ElementType, useId } from "react";
import clsx from "clsx";
import { ExtendedInputProps } from "./types";
import FormFieldLabel from "./components/FormFieldLabel";
import FormFieldRoot from "./components/FormFieldRoot";
import FormFieldFooter from "./components/FormFieldFooter";
import useCurrentLength from "./hooks/useCurrentLength";

export type FormFieldProps<T extends ElementType> = {
    /**
     * The HTML element or React component to render as the input field.
     *
     * @default "input"
     */
    as?: T;
} & ExtendedInputProps & Omit<ComponentProps<T>, keyof ExtendedInputProps>;

const DEFAULT_ELEMENT = "input";

/**
 * A versatile form field component that can render different types of input elements
 * (like input, textarea) with a label, optional icon, and footer for
 * messages or character counts. It extends standard HTML element props.
 *
 * @example
 * // Basic usage with an input element:
 * <FormField
 *    id="username"
 *    name="username"
 *    label="Username"
 *    placeholder="Enter your username"
 * />
 *
 *  @example
 * // Using a textarea element with an icon and character count:
 * <FormField
 *    as="textarea"
 *    id="bio"
 *    name="bio"
 *    label="Bio"
 *    labelIcon={<TypographyIcon Icon={AccountCircleIcon} />}
 *    maxLength={150}
 *    defaultValue="This is my bio."
 *    message="You can write about yourself here."
 * />
 */
export default function FormField<
    T extends ElementType = typeof DEFAULT_ELEMENT
>(
    {
        as,
        label,
        labelIcon,
        state = 'default',
        message,
        maxLength,
        className,
        defaultValue,
        onChange,
        ...props
    }: FormFieldProps<T>
) {
    const Element = as || DEFAULT_ELEMENT;

    const {
        length, handleChange
    } = useCurrentLength<HTMLInputElement | HTMLTextAreaElement>(
        defaultValue,
        onChange
    );

    const messageId = useId();

    return (
        <FormFieldRoot state={state}>
            <FormFieldLabel
                label={label}
                labelIcon={labelIcon}
                htmlFor={props.id}
            />
            <Element
                {...props}
                onChange={handleChange}
                defaultValue={defaultValue}
                className={clsx("form-field", className)}
                aria-describedby={message ? messageId : undefined}
                aria-invalid={state === 'error'}
            />
            <FormFieldFooter
                message={message}
                messageId={messageId}
                maxLength={maxLength}
                length={length}
            />
        </FormFieldRoot>
    );
}