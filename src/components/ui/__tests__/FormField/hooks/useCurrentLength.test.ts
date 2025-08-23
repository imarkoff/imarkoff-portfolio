import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChangeEvent } from "react";
import useCurrentLength from "../../../FormField/hooks/useCurrentLength";

describe("useCurrentLength", () => {
    it("should initialize length to 0 when no defaultValue is provided", () => {
        const { result } = renderHook(() =>
            useCurrentLength(undefined, undefined)
        );

        expect(result.current.length).toBe(0);
    });

    it("should initialize length based on defaultValue", () => {
        const { result } = renderHook(() =>
            useCurrentLength("hello", undefined)
        );

        expect(result.current.length).toBe(5);
    });

    it("should update length on handleChange", () => {
        const event = {
            target: { value: "test" },
        } as ChangeEvent<HTMLInputElement>;

        const { result } = renderHook(() =>
            useCurrentLength("", undefined)
        );
        act(() => {
            result.current.handleChange(event);
        });

        expect(result.current.length).toBe(4);
    });

    it("should call the provided onChange callback", () => {
        const onChange = vi.fn();
        const event = {
            target: { value: "test" },
        } as ChangeEvent<HTMLInputElement>;

        const { result } = renderHook(() =>
            useCurrentLength("", onChange)
        );
        act(() => {
            result.current.handleChange(event);
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(event);
    });
});