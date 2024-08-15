import Snake from "../../src/animals/Snake";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  NEGATIVE_AGE_ERROR_MESSAGE,
  NEGATIVE_LENGTH_ERROR_MESSAGE,
} from "../errorMessages";

describe("Snake Class Tests", () => {
  test("should log an error if length is negative", () => {
    expect(() => {
      const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", -4);
    }).toThrow(NEGATIVE_LENGTH_ERROR_MESSAGE);
  });
  test("should log an error if length is zero", () => {
    expect(() => {
      const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 0);
    }).toThrow(NEGATIVE_LENGTH_ERROR_MESSAGE);
  });
  test("should throw an error if age is negative", () => {
    expect(() => {
      const snake = new Snake("Sssnake", -3, "Anaconda", false, "Red", 4);
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE);
  });
  test("should throw an error if name is empty", () => {
    expect(() => {
      const snake = new Snake("", 3, "Anaconda", false, "Red", 4);
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE);
  });
  test("should throw an error if color is empty", () => {
    expect(() => {
      const snake = new Snake("", 3, "Anaconda", false, "", 4);
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE);
  });
  test("should create a Snake instance with valid inputs", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    expect(snake.getName()).toBe("Sssnake");
    expect(snake.getAge()).toBe(3);
    expect(snake.getIsMale()).toBe(false);
    expect(snake.getIsAdult()).toBe(true);
  });
  test("should call swim method correctly", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    expect(snake.swim()).toBe("Sssnake is swimming");
  });
  test("should call walk method correctly", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    expect(snake.walk()).toBe("Sssnake is sliding");
  });
});
