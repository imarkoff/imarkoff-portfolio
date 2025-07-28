import { TickerDirection } from "../types";

export function calculateTickerAnimation(
    contentHeight: number,
    spacing: number,
    direction: TickerDirection,
    speed: number
) {
    const animationDistance = calculateAnimationDistance(contentHeight, spacing);
    const yPosition = calculateYPosition(animationDistance, direction);
    const duration = calculateDuration(animationDistance, speed);

    return { yPosition, duration };
}

export function calculateAnimationDistance(contentHeight: number, spacing: number): number {
    return contentHeight + spacing;
}

export function calculateYPosition(animationDistance: number, direction: TickerDirection) {
    return direction === "up"
        ? { start: 0, end: -animationDistance }
        : { start: -animationDistance, end: 0 };
}

export function calculateDuration(animationDistance: number, speed: number): number {
    // 50 is a multiplier to convert speed to pixels per second
    return animationDistance / (speed * 50);
}