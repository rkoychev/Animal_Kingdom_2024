import Snake, { NUMBER_OF_BABY_SNAKES_BORN } from "../../src/animals/Snake";
import { snakes } from "../../src/app";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  NEGATIVE_LENGTH_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
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
  test("should call show Home method correctly", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    expect(snake.showHome()).toBe("Sssnake lives in hole");
    snake.setHome(undefined);
    expect(snake.showHome()).toBe("Sssnake doesn't have a home yet");
  });
  test("should throw an error if a male is giving birth", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", true, "Red", 4);
    expect(() => {
      snake.giveBirth();
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH);
  });
  test("should throw an error if a female is giving birth without a home", () => {
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    snake.setHome(undefined);
    expect(() => {
      snake.giveBirth();
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME);
  });
  test("should call give birth method correctly", () => {
    //making an animal family to add the crocodile in
    const snake = new Snake("Sssnake", 3, "Anaconda", false, "Red", 4);
    const initialNumberOfSnakes = snakes.length;
    snake.giveBirth();
    expect(snakes.length).toBe(
      initialNumberOfSnakes + NUMBER_OF_BABY_SNAKES_BORN
    );
  });
});
