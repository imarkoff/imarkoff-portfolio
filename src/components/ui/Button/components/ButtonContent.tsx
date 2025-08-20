import {Children, ComponentType, ReactNode} from "react";
import IconType from "@/components/icons/IconType";
import ProgressActivityIcon from "@/components/icons/ProgressActivityIcon";

interface ButtonContentProps {
    loading?: boolean;
    LeftIcon?: ComponentType<IconType>;
    RightIcon?: ComponentType<IconType>;
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
                <span className={"leading-tight"}>
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