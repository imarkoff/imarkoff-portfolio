import {ComponentType, ReactNode} from "react";
import clsx from "clsx";
import IconType from "@/components/icons/IconType";
import AlertIcon from "./components/AlertIcon";
import {AlertType} from "./types";

interface AlertProps {
    /**
     * The type of alert to display, which determines the styling and icon.
     * Can be one of 'success', 'error', 'warning', or 'info'.
     */
    type?: AlertType;

    /**
     * The message to display inside the alert box.
     * Can be a string or a ReactNode for more complex content.
     */
    message: ReactNode;

    /**
     * An optional icon component to display alongside the alert message.
     * If set to false, no icon will be displayed.
     * If not provided, a default icon based on the alert type will be used.
     */
    Icon?: ComponentType<IconType> | false;
}

/**
 * Renders an alert box with a message and an optional icon, styled according to the alert type.
 *
 * @example
 * // Basic usage with a success type
 * <Alert type="success" message="Operation completed successfully!" />
 *
 * @example
 * // Custom icon usage
 * <Alert type="error" message="Something went wrong." Icon={CustomErrorIcon} />
 *
 * @example
 * // Hide the icon
 * <Alert type="info" message="This is an informational alert." Icon={false} />
 */
export default function Alert(
    { type, message, Icon }: AlertProps
) {
    return (
        <div
            className={clsx(
                `alert`,
                {
                    'alert-success': type === 'success',
                    'alert-error': type === 'error',
                    'alert-warning': type === 'warning',
                    'alert-info': type === 'info',
                }
            )}
            role="alert"
        >
            <AlertIcon type={type} Icon={Icon} />
            <span className="alert-message">
                {message}
            </span>
        </div>
    );
}