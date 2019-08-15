export function lineEq(y2, y1, x2, x1, currentVal) {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return m * currentVal + b;
}

export function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}

export function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}