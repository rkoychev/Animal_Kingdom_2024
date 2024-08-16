import Tortoise, {
  NUMBER_OF_BABY_TORTOISES_BORN,
} from "../../src/animals/Tortoise";
import { tortoises } from "../../src/app";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from "../errorMessages";

describe("turtle Class Tests", () => {
  test("should throw an error if age is negative", () => {
    expect(() => {
      const turtle = new Tortoise("Turtle", -4, false);
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE);
  });
  test("should throw an error if name is empty", () => {
    expect(() => {
      const turtle = new Tortoise("", 4, false);
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE);
  });
  test("should create a turtleoise instance with valid inputs", () => {
    const turtle = new Tortoise("Turtle", 4, false);
    expect(turtle.getName()).toBe("Turtle");
    expect(turtle.getAge()).toBe(4);
    expect(turtle.getIsMale()).toBe(false);
    expect(turtle.getIsAdult()).toBe(true);
  });
  test("should call swim method correctly", () => {
    const turtle = new Tortoise("Turtle", 4, false);
    expect(turtle.swim()).toBe("Turtle is swimming");
  });
  test("should call walk method correctly", () => {
    const turtle = new Tortoise("Turtle", 4, false);
    expect(turtle.walk()).toBe("Turtle is walking");
  });
  test("should call showHome method correctly", () => {
    const turtle = new Tortoise("Turtle", 4, false);
    expect(turtle.showHome()).toBe("Turtle lives in Animal Kingdom");
    turtle.setHome(undefined);
    expect(turtle.showHome()).toBe(`Turtle doesn't have a home yet`);
  });
  test("should throw an error if a male is giving birth", () => {
    const turtle = new Tortoise("Turtle", 4, true);
    expect(() => {
      turtle.giveBirth();
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH);
  });
  test("should throw an error if a female is giving birth without a home", () => {
    const turtle = new Tortoise("Turtle", 4, false);
    turtle.setHome(undefined);
    expect(() => {
      turtle.giveBirth();
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME);
  });
  test("should call give birth method correctly", () => {
    //making an animal family to add the crocodile in
    const turtle = new Tortoise("Turtle", 4, false);
    const initialNumberOfturtles = tortoises.length;
    turtle.giveBirth();
    expect(tortoises.length).toBe(
      initialNumberOfturtles + NUMBER_OF_BABY_TORTOISES_BORN
    );
  });
});
