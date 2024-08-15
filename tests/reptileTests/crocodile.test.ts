import Crocodile from "../../src/animals/Crocodile";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  NEGATIVE_AGE_ERROR_MESSAGE,
  NEGATIVE_LENGTH_ERROR_MESSAGE,
} from "../errorMessages";

describe("Crocodile Class Tests", () => {
  test("should log an error if length is negative", () => {
    expect(() => {
      const crocodile = new Crocodile("Croco", 3, true, -3);
    }).toThrow(NEGATIVE_LENGTH_ERROR_MESSAGE);
  });
  test("should log an error if length is zero", () => {
    expect(() => {
      const crocodile = new Crocodile("Croco", 3, true, 0);
    }).toThrow(NEGATIVE_LENGTH_ERROR_MESSAGE);
  });
  test("should throw an error if age is negative", () => {
    expect(() => {
      const crocodile = new Crocodile("Croco", -3, false, 5);
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE);
  });
  test("should throw an error if name is empty", () => {
    expect(() => {
      const crocodile = new Crocodile("", 3, false, 5);
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE);
  });
  test("should create a Crocodile instance with valid inputs", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    expect(crocodile.getName()).toBe("Croco");
    expect(crocodile.getAge()).toBe(4);
    expect(crocodile.getIsMale()).toBe(false);
    expect(crocodile.getIsAdult()).toBe(true);
  });
  test("should call swim method correctly", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    expect(crocodile.swim()).toBe("Croco is swimming");
  });
  test("should call walk method correctly", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    expect(crocodile.walk()).toBe("Croco is walking");
  });
});
