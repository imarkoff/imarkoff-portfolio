import {Children, ComponentType, ReactNode} from "react";
import IconProps from "@/components/icons/types/IconProps";
import {ProgressActivityIcon} from "@/components/icons";

export interface ButtonContentProps {
    loading?: boolean;
    LeftIcon?: ComponentType<IconProps>;
    RightIcon?: ComponentType<IconProps>;
    children?: ReactNode;
}

export default function ButtonContent(
    {
        loading = false,
        LeftIcon,
        RightIcon,
        children
    }: ButtonContentProps
) {
    const childrenExists = Children
        .toArray(children)
        .find(child => !!child);

    return (
        <>
            {LeftIcon && (
                <LeftIcon className={"icon"} data-testid={"left-icon"} />
            )}
            {childrenExists && (
                <span className={"leading-tight"} data-testid={"button-children"}>
                    {children}
                </span>
            )}
            {RightIcon && (
                <RightIcon className={"icon"} data-testid={"right-icon"} />
            )}
            {loading && (
                <span className={"loading-spinner"} data-testid="loading-spinner">
                    <ProgressActivityIcon className={"spinner-icon"} />
                </span>
            )}
        </>
    );
}