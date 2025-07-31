import {describe, it, expect} from "vitest";
import getDecimalPlaces from "@/utils/getDecimalPlaces";

describe("getDecimalPlaces", () => {
    it("should return the number of decimal places in a number", () => {
        expect(getDecimalPlaces(123.456)).toBe(3);
        expect(getDecimalPlaces(100)).toBe(0);
        expect(getDecimalPlaces(0.001)).toBe(3);
        expect(getDecimalPlaces(0)).toBe(0);
        expect(getDecimalPlaces(-123.456)).toBe(3);
    });

    it("should return 0 for integers", () => {
        expect(getDecimalPlaces(1)).toBe(0);
        expect(getDecimalPlaces(-1)).toBe(0);
        expect(getDecimalPlaces(1000)).toBe(0);
    });

    it("should not count trailing zeros in decimal places", () => {
        expect(getDecimalPlaces(0.3400)).toBe(2);
        expect(getDecimalPlaces(0.1000)).toBe(1);
        expect(getDecimalPlaces(1.0000)).toBe(0);
    });
});