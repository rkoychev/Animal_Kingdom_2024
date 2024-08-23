import Tortoise, { TOIRTOISE_SPACE_NEEDED_AS_ADULT, TOIRTOISE_SPACE_NEEDED_AS_CHILD } from '../../src/animals/Tortoise'
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from '../../messages/errorMessages'
import { AGE_TO_BE_ADULT } from '../../src/hierarchy/Animal'
import Reptile from '../../src/hierarchy/Reptile'

describe('turtle Class Tests', () => {
  test('should throw an error if age is negative', () => {
    expect(() => {
      const turtle = new Tortoise('Turtle', -4, false)
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE)
  })
  test('should throw an error if name is empty', () => {
    expect(() => {
      const turtle = new Tortoise('', 4, false)
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE)
  })
  test('should create a Tortoise instance with valid inputs', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    expect(turtle.getName()).toBe('Turtle')
    expect(turtle.getAge()).toBe(4)
    expect(turtle.getIsMale()).toBe(false)
    expect(turtle.getIsAdult()).toBe(true)
  })
  test('should call swim method correctly', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    expect(turtle.swim()).toBe('Turtle is swimming')
  })
  test('should call walk method correctly', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    expect(turtle.walk()).toBe('Turtle is walking')
  })
  test('should call showHome method correctly', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    expect(turtle.showHome()).toBe('Turtle lives in Animal Kingdom')
    turtle.setHome(undefined)
    expect(turtle.showHome()).toBe(`Turtle doesn't have a home yet`)
  })
  test('should throw an error if a male is giving birth', () => {
    const turtle = new Tortoise('Turtle', 4, true)
    expect(() => {
      turtle.giveBirth()
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH)
  })
  test('should throw an error if a female is giving birth without a home', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    turtle.setHome(undefined)
    expect(() => {
      turtle.giveBirth()
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME)
  })
  test('should call get space needed method correctly', () => {
    const t1 = new Tortoise('Toiroise1', 4, true)
    const t2 = new Tortoise('Toiroise2', 1, true)
    const t3 = new Tortoise('Toiroise3', AGE_TO_BE_ADULT, true)

    expect(t1.getSpaceNeeded()).toBe(TOIRTOISE_SPACE_NEEDED_AS_ADULT)
    expect(t2.getSpaceNeeded()).toBe(TOIRTOISE_SPACE_NEEDED_AS_CHILD)
    expect(t3.getSpaceNeeded()).toBe(TOIRTOISE_SPACE_NEEDED_AS_ADULT)
  })
  test('should call give birth method correctly', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    const babies = turtle.giveBirth()
    expect(babies.length).toBe(Reptile.NUMBER_OF_BABY_REPTILES_BORN)
  })
  test('should call give birth method correctly with at least 2 males and 1 female', () => {
    const turtle = new Tortoise('Turtle', 4, false)
    const babies = turtle.giveBirth()
    const maleCount = babies.filter((baby) => baby.getIsMale() === true).length
    expect(maleCount).toBeGreaterThanOrEqual(2)
    const femaleCount = babies.filter((baby) => baby.getIsMale() === false).length
    expect(femaleCount).toBeGreaterThanOrEqual(1)
  })
})
