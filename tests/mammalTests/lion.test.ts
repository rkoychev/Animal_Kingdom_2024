import Lion, {
  LION_SPACE_NEEDED_AS_ADULT,
  LION_SPACE_NEEDED_AS_CHILD,
  NUMBER_OF_BABY_LIONS_BORN,
} from '../../src/animals/Lion'
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from '../../messages/errorMessages'
import AnimalFamily from '../../src/animalFamily/AnimalFamily'
import { AGE_TO_BE_ADULT } from '../../src/hierarchy/Animal'

describe('Lion Class Tests', () => {
  test('should log an error if age is negative', () => {
    expect(() => {
      const lion = new Lion('Simba', -5, true)
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE)
  })
  test('should log an error if name is an empty string', () => {
    expect(() => {
      const lion = new Lion('', 5, true)
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE)
  })
  test('should create a Lion instance with valid props', () => {
    const lion = new Lion('Simba', 5, true)
    expect(lion.getName()).toBe('Simba')
    expect(lion.getAge()).toBe(5)
    expect(lion.getIsMale()).toBe(true)
  })

  test('should call run method correctly', () => {
    const lion = new Lion('Simba', 5, true)
    expect(lion.run()).toBe('Simba is running')
  })

  test('should call talk method correctly', () => {
    const lion = new Lion('Simba', 5, true)
    expect(lion.talk()).toBe('Simba is talking')
  })
  test('should call jump method correctly', () => {
    const lion = new Lion('Simba', 5, true)
    expect(lion.jump()).toBe('Simba is jumping')
  })

  test('should log an error if a male lion calls giveBirth', () => {
    const lion = new Lion('Simba', 5, true)
    expect(() => {
      lion.giveBirth()
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH)
  })
  test('should throw an error if a lion with no home calls giveBirth', () => {
    const lion = new Lion('Nala', 4, false)
    lion.setHome(undefined)
    expect(() => {
      lion.giveBirth()
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME)
  })
  test('should get space needed correctly', () => {
    const lion = new Lion('Lio1', 1, false)
    const lion2 = new Lion('Lio2', 4, false)
    const lion3 = new Lion('Lio3', AGE_TO_BE_ADULT, false)
    expect(lion.getSpaceNeeded()).toBe(LION_SPACE_NEEDED_AS_CHILD)
    expect(lion2.getSpaceNeeded()).toBe(LION_SPACE_NEEDED_AS_ADULT)
    expect(lion3.getSpaceNeeded()).toBe(LION_SPACE_NEEDED_AS_ADULT)
  })
  test('should call  giveBirth correctly', () => {
    const lion = new Lion('Nala', 4, false)
    const lion2 = new Lion('imba', 4, false)
    const lion3 = new Lion('Nala', 4, false)
    const lion4 = new Lion('Nala', 4, false)
    const lion5 = new Lion('Nala', 4, false)
    const lion6 = new Lion('Nala', 4, false)
    const lion7 = new Lion('Nala', 4, false)
    const lion8 = new Lion('Nala', 4, false)
    const lions = new AnimalFamily('Lions', [lion, lion2, lion3, lion4, lion5, lion6, lion7, lion8])
    const babies = lion.giveBirth()
    expect(babies.length).toBe(NUMBER_OF_BABY_LIONS_BORN)
  })
})
