import AnimalFamily from "../../src/animalFamily/AnimalFamily";
import Crocodile from "../../src/animals/Crocodile";
import { NUMBER_OF_BABY_CROCODILES_BORN } from "../../src/animals/Crocodile";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  NEGATIVE_LENGTH_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from "../../messages/errorMessages";

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
  test("should call show Home correctly", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    expect(crocodile.showHome()).toBe("Croco doesn't have a home yet");
    const crocodile2 = new Crocodile("Simona", 4, false, 4);
    const crocsFamily = new AnimalFamily("Crocodiles2", [
      crocodile,
      crocodile2,
    ]);
    expect(crocodile.showHome()).toBe("Croco lives in Crocodiles2");
  });
  test("should throw an error if a male is giving birth", () => {
    const crocodile = new Crocodile("Croco", 4, true, 4);
    expect(() => {
      crocodile.giveBirth();
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH);
  });
  test("should throw an error if a female is giving birth without a home", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    expect(() => {
      crocodile.giveBirth();
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME);
  });
  test("should call give birth method correctly", () => {
    const crocodile = new Crocodile("Croco", 4, false, 4);
    const crocodile2 = new Crocodile("Simona", 4, false, 4);
    const crocsFamily = new AnimalFamily("Crocodiles", [crocodile, crocodile2]);
    const babies = crocodile.giveBirth();
    expect(babies.length).toBe(NUMBER_OF_BABY_CROCODILES_BORN);
  });
  test("should call give birth method correctly with at least 2 males and 1 female", () => {
    const crocodile3 = new Crocodile("Croco", 4, false, 4);
    const crocodile4 = new Crocodile("Simona", 4, false, 4);
    const crocsFamily2 = new AnimalFamily("Crocodiles3", [
      crocodile3,
      crocodile4,
    ]);
    const babies = crocodile3.giveBirth();
    const maleCount = babies.filter((baby) => baby.getIsMale() === true).length;
    expect(maleCount).toBeGreaterThanOrEqual(2);
    const femaleCount = babies.filter(
      (baby) => baby.getIsMale() === false
    ).length;
    expect(femaleCount).toBeGreaterThanOrEqual(1);
  });
});
