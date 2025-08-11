import {CSSProperties, useMemo} from "react";
import Project from "@/lib/models/Project";

export default function useProjectCardStyles(
    projectColors: Project['colors']
): CSSProperties {
    const colors = useMemo(() => {
        if (!projectColors || projectColors.primaryHue === undefined) return undefined;

        return {
            textPrimary: `hsla(${projectColors.primaryHue}, 68%, 95%, 1)`,
            primary: `hsla(${projectColors.primaryHue}, 76%, 60%, 1)`,
            onPrimary: `hsla(${projectColors.primaryHue}, 31%, 20%, 1)`,
            primaryHover: `hsla(${projectColors.primaryHue}, 82%, 75%, 1)`,
            primaryDisabled: `hsla(${projectColors.primaryHue}, 79%, 68%, 0.5)`,
            primaryShadow: `hsla(${projectColors.primaryHue}, 76%, 60%, 0.1)`,
        };
    }, [projectColors]);

    return useMemo(() => ({
        "--primary-hue": projectColors?.primaryHue,
        "--color-primary": colors?.textPrimary,
        "--color-active-filled": colors?.primary,
        "--color-on-active-filled": colors?.onPrimary,
        "--color-active-filled-hover": colors?.primaryHover,
        "--color-active-filled-disabled": colors?.primaryDisabled,
        background: projectColors?.background
            ? `${projectColors.background}, var(--color-background)`
            : "var(--color-background)",
        borderColor: colors?.primary,
        boxShadow: `0px 6px 40px 0px ${colors?.primaryShadow || "rgba(0, 0, 0, 0.1)"}`,
    }), [projectColors, colors]);
}