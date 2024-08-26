import {
  ANIMALS_ALREADY_HAVE_FAMILY,
  ANIMAL_ALREADY_IN_FAMILY,
  ANIMAL_CANNOT_HAVE_FAMILY_ERROR_MESSAGE,
  ANIMAL_NOT_PART_OF_FAMILY,
  DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY,
  EMPTY_FAMILY_ERROR_MESSAGE,
  FAMILY_MAX_MALE_ADULTS_EXCEEDED,
  FAMILY_MAX_MEMBERS_EXCEEDED,
  FAMILY_MIN_MEMBERS_NOT_MET,
  FAMILY_NAME_TAKEN,
} from '../messages/errorMessages'
import AnimalFamily from '../src/animalFamily/AnimalFamily'
import Crocodile from '../src/animals/Crocodile'
import Lion from '../src/animals/Lion'
import Snake from '../src/animals/Snake'
import { families } from '../src/app'
beforeEach(() => {
  families.length = 0
})
describe('Animal Families Tests', () => {
  test('should throw an error if we make a family with 0 animals', () => {
    expect(() => {
      const family = new AnimalFamily('Empty', [])
    }).toThrow(EMPTY_FAMILY_ERROR_MESSAGE)
  })
  test('should throw an error if we make a family with animals already in a family', () => {
    expect(() => {
      const crocodile = new Crocodile('Croco', 4, false, 4)
      const crocodile2 = new Crocodile('Simona', 1, false, 4)
      const crocodile3 = new Crocodile('Simona2', 4, false, 2)
      const family = new AnimalFamily('Empty', [crocodile, crocodile2, crocodile3])
      const family2 = new AnimalFamily('Empty', [crocodile, crocodile2, crocodile3])
    }).toThrow(ANIMALS_ALREADY_HAVE_FAMILY)
  })
  test('should throw an error if we make a family with animals that cannot have one', () => {
    expect(() => {
      const snake = new Snake('s', 4, 'Anaconda', true, 'red', 44)
      const family = new AnimalFamily('Empty', [snake])
    }).toThrow(ANIMAL_CANNOT_HAVE_FAMILY_ERROR_MESSAGE)
  })

  test('should throw an error array if we make a family with already taken name', () => {
    expect(() => {
      const crocodile = new Crocodile('Croco', 4, false, 4)
      const crocodile2 = new Crocodile('Simona', 1, false, 4)
      const crocodile3 = new Crocodile('Simona2', 4, false, 2)
      const crocodile4 = new Crocodile('Croco', 4, false, 4)
      const crocodile5 = new Crocodile('Simona', 1, false, 4)
      const crocodile6 = new Crocodile('Simona2', 4, false, 2)
      const family = new AnimalFamily('Empty', [crocodile, crocodile2, crocodile3])
      const family2 = new AnimalFamily('Empty', [crocodile4, crocodile5, crocodile6])
    }).toThrow(FAMILY_NAME_TAKEN)
  })
  test('should return an array with string that animal is already part of the family when we try to add', () => {
    const crocodile = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const family = new AnimalFamily('Family2', [crocodile, crocodile2, crocodile3])
    const result = family.checkCanAddAnimal(crocodile)
    expect(result).toEqual([ANIMAL_ALREADY_IN_FAMILY])
  })
  test('should return an array with string that different animal types cannot be in the same family', () => {
    const crocodile = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const lion = new Lion('simba', 4, true)
    const family = new AnimalFamily('Family3', [crocodile, crocodile2, crocodile3])
    const result = family.checkCanAddAnimal(lion)
    expect(result).toEqual([DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY])
  })
  test('should return true that animal is added to family and an empty array for the checkCanAddAnimal', () => {
    const croc = new Crocodile('Croco', 4, false, 4)
    const croc2 = new Crocodile('Simona', 1, false, 4)
    const croc3 = new Crocodile('Simona2', 4, false, 2)
    const croc4 = new Crocodile('Crocoss', 4, false, 4)
    const crocFam = new AnimalFamily('Family4', [croc, croc2, croc3])
    expect(crocFam.checkCanAddAnimal(croc4)).toEqual([])
    expect(crocFam.addAnimal(croc4)).toEqual(true)
  })
  test('should return true that animal is removed from family', () => {
    const croc = new Crocodile('Croco', 4, false, 4)
    const croc2 = new Crocodile('Simona', 1, false, 4)
    const croc3 = new Crocodile('Simona2', 4, false, 2)
    const croc4 = new Crocodile('Crocoss', 4, false, 4)
    const crocFam = new AnimalFamily('Family4', [croc, croc2, croc3])
    crocFam.addAnimal(croc4)
    expect(crocFam.checkCanRemoveAnimal(croc4)).toEqual([])
    expect(crocFam.removeAnimal(croc4)).toEqual(true)
  })
  test('should switch animal family correctly ', () => {
    const croc = new Crocodile('Croco', 4, false, 4)
    const croc2 = new Crocodile('Simona', 1, false, 4)
    const croc3 = new Crocodile('Simona2', 4, false, 2)
    const crocodile1 = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const crocFam = new AnimalFamily('Family4', [croc, croc2, croc3])
    const crocodiles = new AnimalFamily('Familia', [crocodile1, crocodile2, crocodile3])
    expect(croc3.switchFamily(crocodiles)).toBe(true)
  })
  test('should return an error array if animal is not in the family ', () => {
    const croc = new Crocodile('Croco', 4, false, 4)
    const croc2 = new Crocodile('Simona', 1, false, 4)
    const croc3 = new Crocodile('Simona2', 4, false, 2)
    const crocFam = new AnimalFamily('Family4', [croc, croc2])
    expect(crocFam.checkCanRemoveAnimal(croc3)).toEqual([`Simona2` + ANIMAL_NOT_PART_OF_FAMILY + 'Family4'])
  })
  test('should return false if we want to switch family of animal that cannot have one', () => {
    const snake = new Snake('s', 4, 'Anaconda', true, 'red', 44)
    const crocodile1 = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const crocodiles = new AnimalFamily('Familia', [crocodile1, crocodile2, crocodile3])
    expect(snake.switchFamily(crocodiles)).toBe(false)
  })
  test('should return false if we want to switch family of animal that doesnt have one', () => {
    const crocodile1 = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const crocodiles = new AnimalFamily('Familia', [crocodile1, crocodile2])
    expect(crocodile3.switchFamily(crocodiles)).toBe(false)
  })
  test('should throw an error if we make a family with two types of animals', () => {
    const crocodile1 = new Crocodile('Croco', 4, false, 4)
    const crocodile2 = new Crocodile('Simona', 1, false, 4)
    const crocodile3 = new Crocodile('Simona2', 4, false, 2)
    const lion = new Lion('lei', 4, false)
    expect(() => new AnimalFamily('Familia', [crocodile1, crocodile2, lion])).toThrow(
      DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY,
    )
  })
  test('should throw an error if we make a family with more animals than the limit', () => {
    const lions = Array.from({ length: 11 }, (_, i) => new Lion(`Lion${i + 1}`, i + 1, false))
    expect(() => new AnimalFamily('LionFamily', lions)).toThrow(FAMILY_MAX_MEMBERS_EXCEEDED + '10')
  })
  test('should throw an error if we make a family with more adult males the limit', () => {
    const lions = Array.from({ length: 9 }, (_, i) => new Lion(`Lion${i + 1}`, i + 1, true))
    expect(() => new AnimalFamily('LionFamily', lions)).toThrow(FAMILY_MAX_MALE_ADULTS_EXCEEDED + '1')
  })
  test('should throw an error if we make a family with lessmembers than the minimum', () => {
    const lions = Array.from({ length: 7 }, (_, i) => new Lion(`Lion${i + 1}`, i + 1, false))
    expect(() => new AnimalFamily('LionFamily', lions)).toThrow(FAMILY_MIN_MEMBERS_NOT_MET + '8')
  })
})
