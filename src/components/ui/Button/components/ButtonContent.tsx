import clsx from "clsx";
import ProgressActivityIcon from "@/components/icons/ProgressActivityIcon";
import {ButtonSize} from "@/components/ui/Button/types";
import {ComponentType, ReactNode} from "react";
import IconType from "@/components/icons/IconType";

interface ButtonContentProps {
    size: ButtonSize;
    loading?: boolean;
    LeftIcon?: ComponentType<IconType>;
    RightIcon?: ComponentType<IconType>;
    children?: ReactNode;
}

export default function ButtonContent(
    {
        size,
        loading = false,
        LeftIcon,
        RightIcon,
        children
    }: ButtonContentProps
) {
    return (
        <>
            <span className={clsx(
                "leading-tight inline-flex items-center justify-center",
                {"gap-button-gap-md": size === "medium"},
                {"gap-button-gap-sm": size === "small"},
                "transition-all duration-200",
                loading && "blur-sm"
            )}>
                {LeftIcon && (
                    <LeftIcon className={"size-icon-md"} data-testid={"left-icon"} />
                )}
                {children}
                {RightIcon && (
                    <RightIcon className={"size-icon-md"} data-testid={"right-icon"} />
                )}
            </span>
            {loading && (
                <span className={clsx(
                    "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                    "size-icon-md"
                )} data-testid="loading-spinner">
                    <ProgressActivityIcon className={"size-icon-md animate-spin"} />
                </span>
            )}
        </>
    );
}