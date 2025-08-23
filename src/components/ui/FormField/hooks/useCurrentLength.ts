import {ChangeEvent, HTMLAttributes, useState} from "react";

export default function useCurrentLength<
    T extends HTMLInputElement | HTMLTextAreaElement
>(
    defaultValue: HTMLAttributes<T>['defaultValue'],
    onChange: HTMLAttributes<T>['onChange']
) {
    const defaultValueLength = defaultValue ? defaultValue.toString().length : 0;
    const [length, setLength] = useState<number>(defaultValueLength);

    const handleChange = (e: ChangeEvent<T>) => {
        setLength(e.target.value.length);
        if (onChange) {
            onChange(e);
        }
    };

    return {
        length,
        handleChange
    };
}