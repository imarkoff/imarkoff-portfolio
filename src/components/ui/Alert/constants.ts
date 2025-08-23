import {AlertType} from "@/components/ui/Alert/types";
import {IconName} from "@/components/icons/IconMap";

export const DEFAULT_ICONS: Record<AlertType, IconName> = {
    success: "check_circle",
    error: "error",
    info: "info",
    warning: "warning",
}