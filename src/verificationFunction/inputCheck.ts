export function checkAge(age: number): void {
  if (age < 0) {
    throw new Error("Age can't be negative");
  }
}
export function checkLength(length: number): void {
  if (length <= 0) {
    throw new Error("Length can't be negative or 0");
  }
}
export function checkHoleSize(holeSize: number): void {
  if (holeSize < 0) {
    throw new Error("Hole size can't be negative");
  }
}
