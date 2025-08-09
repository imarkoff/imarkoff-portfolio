import {ProjectCardProps} from "../types";
import {CSSProperties, useMemo} from "react";

export default function useProjectCardStyles(
    project: ProjectCardProps['project']
): CSSProperties {
    const colors = useMemo(() => {
        if (!project.colors) return undefined;
        return {
            textPrimary: `hsla(${project.colors.primaryHue}, 68%, 95%, 1)`,
            primary: `hsla(${project.colors.primaryHue}, 76%, 60%, 1)`,
            onPrimary: `hsla(${project.colors.primaryHue}, 31%, 20%, 1)`,
            primaryHover: `hsla(${project.colors.primaryHue}, 82%, 75%, 1)`,
            primaryDisabled: `hsla(${project.colors.primaryHue}, 79%, 68%, 0.5)`,
            primaryShadow: `hsla(${project.colors.primaryHue}, 76%, 60%, 0.1)`,
        };
    }, [project.colors]);

    return useMemo(() => ({
        "--primary-hue": project.colors?.primaryHue,
        "--color-primary": colors?.textPrimary,
        "--color-active-filled": colors?.primary,
        "--color-on-active-filled": colors?.onPrimary,
        "--color-active-filled-hover": colors?.primaryHover,
        "--color-active-filled-disabled": colors?.primaryDisabled,
        background: project.colors?.background
            ? `${project.colors.background}, var(--color-background)`
            : "var(--color-background)",
        borderColor: colors?.primary,
        boxShadow: `0px 6px 40px 0px ${colors?.primaryShadow || "rgba(0, 0, 0, 0.1)"}`,
    }), [project.colors, colors]);
}