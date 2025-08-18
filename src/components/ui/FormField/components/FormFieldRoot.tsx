import {PropsWithChildren} from "react";

export default function FormFieldRoot(
    {children}: PropsWithChildren
) {
    return (
        <div className="flex flex-col gap-1.5">
            {children}
        </div>
    );
}