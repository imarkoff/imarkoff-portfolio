import {AlertType} from "./types";
import {IconName} from "@/components/icons/utils/iconMap";

export const DEFAULT_ICONS: Record<AlertType, IconName> = {
    success: "check_circle",
    error: "error",
    info: "info",
    warning: "warning",
}