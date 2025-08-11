import {ComponentProps} from "react";
import getButtonClasses from "@/components/ui/Button/utils/getButtonClasses";
import {ButtonBaseProps} from "@/components/ui/Button/types";
import ButtonContent from "@/components/ui/Button/components/ButtonContent";



export type ButtonProps = ComponentProps<'button'> & ButtonBaseProps & {
    /**
     * Indicates if the button is in a loading state.
     * Disables the button and applies a loading style.
     */
    loading?: boolean;
}

/**
 * Button component with customizable styles and icons.
 *
 * @description
 * This button component supports different sizes, variants, and colors.
 * It can display text, icons, or both, and supports loading states.
 * It uses Tailwind CSS for styling and clsx for conditional class names.
 *
 * @example
 * ```tsx
 * import Button from "@/app/components/ui/Button";
 *
 * <Button
 *   variant="primary"
 *   color="accent"
 *   size="medium"
 *   isLoading={false}
 *   type="action"
 *   leftIcon={<Icon name="left" />}
 *   rightIcon={<Icon name="right" />}
 *   >
 *   Click Me
 * </Button>
 */
export default function Button(
    {
        className,
        children,
        LeftIcon, RightIcon, isIconButton,
        size = "medium",
        variant = "secondary",
        color = "accent",
        loading,
        active,
        type = "button",
        ...props
    }: ButtonProps
) {
    return (
        <button
            className={getButtonClasses({
                size, variant, color,
                isIconButton, LeftIcon, RightIcon,
                active, className,
            })}
            type={type}
            disabled={loading || props.disabled}
            {...props}
        >
            <ButtonContent
                size={size}
                loading={loading}
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
            >
                {children}
            </ButtonContent>
        </button>
    );
}
