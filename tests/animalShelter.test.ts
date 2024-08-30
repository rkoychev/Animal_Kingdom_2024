import {
  FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY,
  NEGATIVE_LIMIT_ERROR_MESSAGE,
  NEGATIVE_SHELTER_TERRITORY,
  NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS,
  NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES,
  NO_SPACE_FOR_MORE_MAMMALS,
  NO_SPACE_FOR_MORE_REPTILES,
} from '../messages/errorMessages'
import { SUCCESFULLY_ADDED_ANIMAL_IN_SHELTER } from '../messages/successMessages'
import AnimalFamily from '../src/animalFamily/AnimalFamily'
import AnimalShelter from '../src/animalShelter/AnimalShelter'
import Crocodile from '../src/animals/Crocodile'
import Elephant from '../src/animals/Elephant'
import Giraffe from '../src/animals/Giraffe'
import Lion from '../src/animals/Lion'
import Snake from '../src/animals/Snake'
import Squirrel from '../src/animals/Squirrel'
import Tortoise from '../src/animals/Tortoise'
beforeEach(() => {
  const animalShelter = AnimalShelter.getInstance()
  animalShelter.resetInstance()
})
describe('Animal Shelter Tests', () => {
  test('should fail to set mammal limits to negative value', () => {
    const animalShelter = AnimalShelter.getInstance()
    const oldMammalLimit = animalShelter.getMammalLimit()
    expect(animalShelter.setMammalLimit(-3)).toBe(NEGATIVE_LIMIT_ERROR_MESSAGE)
    expect(animalShelter.getMammalLimit()).toBe(oldMammalLimit)
  })
  test('should fail to set mammal limits to a value lower than the number of mammals already in the shelter', () => {
    const squirrel = new Squirrel('s1', 3, true, 'Cedar', 55, 33)
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.addAnimal(squirrel)
    const oldMammalLimit = animalShelter.getMammalLimit()
    expect(animalShelter.setMammalLimit(0)).toBe(NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS)
    expect(animalShelter.getMammalLimit()).toBe(oldMammalLimit)
  })

  test('should fail to set reptile limits to negative value', () => {
    const animalShelter = AnimalShelter.getInstance()
    const oldReptileLimit = animalShelter.getReptileLimit()
    expect(animalShelter.setReptileLimit(-3)).toBe(NEGATIVE_LIMIT_ERROR_MESSAGE)
    expect(animalShelter.getReptileLimit()).toBe(oldReptileLimit)
  })
  test('should fail to set reptile limits to a value lower than the number of reptiles already in the shelter', () => {
    const turtle = new Tortoise('T1', 4, true)
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.addAnimal(turtle)
    const oldReptileLimit = animalShelter.getReptileLimit()
    expect(animalShelter.setReptileLimit(0)).toBe(NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES)
    expect(animalShelter.getReptileLimit()).toBe(oldReptileLimit)
  })
  test('should succesfully set mammal limits', () => {
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.setMammalLimit(5)
    expect(animalShelter.getMammalLimit()).toBe(5)
  })
  test('should succesfully set reptile limits', () => {
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.setReptileLimit(5)
    expect(animalShelter.getReptileLimit()).toBe(5)
  })
  test('should succesfully add an animal in the shelter', () => {
    const animalShelter = AnimalShelter.getInstance()
    expect(animalShelter.addAnimal(new Tortoise('t1', 5, true))).toBe('t1 ' + SUCCESFULLY_ADDED_ANIMAL_IN_SHELTER)
  })
  test('should fail to add another mammal if it will exceed the mammal limit', () => {
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.setMammalLimit(1)
    const squirrel = new Squirrel('s1', 3, false, 'Maple', 44, 4)
    const squirrel2 = new Squirrel('s2', 4, false, 'Maple', 44, 4)
    animalShelter.addAnimal(squirrel)
    expect(animalShelter.addAnimal(squirrel2)).toBe(NO_SPACE_FOR_MORE_MAMMALS)
  })
  test('should fail to add another reptile if it will exceed the reptile limit', () => {
    const animalShelter = AnimalShelter.getInstance()
    animalShelter.setReptileLimit(1)
    const tortoise = new Tortoise('t1', 3, false)
    const tortoise2 = new Tortoise('t2', 4, false)
    animalShelter.addAnimal(tortoise)
    expect(animalShelter.addAnimal(tortoise2)).toBe(NO_SPACE_FOR_MORE_REPTILES)
  })
  test('should fail to add crocodile if it cannot be removed from its familly', () => {
    const animalShelter = AnimalShelter.getInstance()
    const croc1 = new Crocodile('t1', 3, false, 5)
    const croco2 = new Crocodile('t2', 4, false, 6)
    const crocodiles1 = new AnimalFamily('crocodiles', [croc1, croco2])
    expect(animalShelter.addAnimal(croc1)).toBe(FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY)
  })
  test('show animals should return an object with the correct number of animals', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise = new Tortoise('t1', 3, false)
    const tortoise2 = new Tortoise('t2', 4, false)
    const squirrel = new Squirrel('s1', 3, false, 'Maple', 44, 4)
    const squirrel2 = new Squirrel('s2', 4, false, 'Maple', 44, 4)
    const lion = new Lion('simba', 4, true)
    animalShelter.addAnimal(tortoise)
    animalShelter.addAnimal(tortoise2)
    animalShelter.addAnimal(squirrel)
    animalShelter.addAnimal(squirrel2)
    animalShelter.addAnimal(lion)
    const animals = animalShelter.showAnimals()
    expect(animals.tortoises).toBe(2)
    expect(animals.crocodiles).toBe(0)
    expect(animals.lions).toBe(1)
    expect(animals.snakes).toBe(0)
    expect(animals.squirrels).toBe(2)
    expect(animals.mamamls).toBe(3)
    expect(animals.reptiles).toBe(2)
  })
  test('reportOfNeededSpace should return the needed space for animals which take 150-300sq ', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise = new Tortoise('t1', 1, false)
    const tortoise2 = new Tortoise('t2', 4, false)
    const crock1 = new Crocodile("Crocko", 1, true, 5);
    const crock2 = new Crocodile("Crocko2", 5, false, 9);
    const snake1 = new Snake("SSSS", 5, "Anaconda", true, "green", 5);
    const snake2 = new Snake("ssss", 1, "Anaconda", false, "green", 2);
    animalShelter.addAnimal(tortoise)
    animalShelter.addAnimal(tortoise2)
    animalShelter.addAnimal(crock1)
    animalShelter.addAnimal(crock2)
    animalShelter.addAnimal(snake1)
    animalShelter.addAnimal(snake2)
    expect(animalShelter.reportOfNeededSpace([tortoise, tortoise2, crock1, crock2, snake1, snake2])).toBe(1350)
  })
  test('reportOfNeededSpace should return the needed space for animals wich take 100-200sq', () => {
    const animalShelter = AnimalShelter.getInstance()
    const lion1 = new Lion('simba', 4, true)
    const lion2 = new Lion('mufasa', 1, false)
    const giraffe1 = new Giraffe("Giraffe1", 5, true, 5);
    const giraffe2 = new Giraffe("Giraffe2", 1, false, 2);
    const elephant1 = new Elephant("Giraffe1", 5, true, 5, 486);
    const elephant2 = new Elephant("Giraffe2", 1, false, 2, 258);
    animalShelter.addAnimal(lion1)
    animalShelter.addAnimal(lion2)
    animalShelter.addAnimal(giraffe1)
    animalShelter.addAnimal(giraffe2)
    animalShelter.addAnimal(elephant1)
    animalShelter.addAnimal(elephant2)
    expect(animalShelter.reportOfNeededSpace([lion1, lion2, giraffe1, giraffe2, elephant1, elephant2])).toBe(900)
  })
  test('reportOfNeededSpace should return the needed space for animals which use 20-40sq', () => {
    const animalShelter = AnimalShelter.getInstance()
    const squirrel = new Squirrel('s1', 3, false, 'Maple', 44, 4)
    const squirrel2 = new Squirrel('s2', 1, false, 'Maple', 44, 4)
    animalShelter.addAnimal(squirrel)
    animalShelter.addAnimal(squirrel2)
    expect(animalShelter.reportOfNeededSpace([squirrel, squirrel2])).toBe(60)
  })
  test('reportOfNeededSpace should return the needed space for the random setof animals', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise = new Tortoise('t1', 1, false)
    const tortoise2 = new Tortoise('t2', 4, false)
    const squirrel = new Squirrel('s1', 3, false, 'Maple', 44, 4)
    const squirrel2 = new Squirrel('s2', 1, false, 'Maple', 44, 4)
    const lion = new Lion('simba', 4, true)
    animalShelter.addAnimal(tortoise)
    animalShelter.addAnimal(tortoise2)
    animalShelter.addAnimal(squirrel)
    animalShelter.addAnimal(squirrel2)
    animalShelter.addAnimal(lion)
    expect(animalShelter.reportOfNeededSpace([tortoise, tortoise2, squirrel, squirrel2, lion])).toBe(710)
  })
  test('reportOfNeededSpace should return the needed space for mammals only', () => {
    const animalShelter = AnimalShelter.getInstance()
    const squirrel = new Squirrel('s1', 3, false, 'Maple', 44, 4)
    const squirrel2 = new Squirrel('s2', 1, false, 'Maple', 44, 4)
    const lion1 = new Lion('simba', 4, true)
    const lion2 = new Lion('mufasa', 1, false)
    const giraffe1 = new Giraffe("Giraffe1", 5, true, 5);
    const giraffe2 = new Giraffe("Giraffe2", 1, false, 2);
    const elephant1 = new Elephant("Giraffe1", 5, true, 5, 486);
    const elephant2 = new Elephant("Giraffe2", 1, false, 2, 258);
    animalShelter.addAnimal(lion1)
    animalShelter.addAnimal(lion2)
    animalShelter.addAnimal(giraffe1)
    animalShelter.addAnimal(giraffe2)
    animalShelter.addAnimal(elephant1)
    animalShelter.addAnimal(elephant2)
    animalShelter.addAnimal(squirrel)
    animalShelter.addAnimal(squirrel2)
    expect(animalShelter.reportOfNeededSpace([squirrel, squirrel2, lion1, lion2, giraffe1, giraffe2, elephant1, elephant2])).toBe(960)
  })
  test('reportOfNeededSpace should return the needed space for reptiles only', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise2 = new Tortoise('t2', 4, false)
    const crock1 = new Crocodile("Crocko", 1, true, 5);
    const crock2 = new Crocodile("Crocko2", 5, false, 9);
    const snake2 = new Snake("ssss", 1, "Anaconda", false, "green", 2);
    animalShelter.addAnimal(tortoise2)
    animalShelter.addAnimal(crock1)
    animalShelter.addAnimal(crock2)
    animalShelter.addAnimal(snake2)

    expect(animalShelter.reportOfNeededSpace([tortoise2, crock1, crock2, snake2])).toBe(900)
  })

  test('reportOfNeededSpace should return the needed space for babies only', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise = new Tortoise('t1', 1, false)
    const crock1 = new Crocodile("Crocko", 1, true, 5);
    const snake2 = new Snake("ssss", 1, "Anaconda", false, "green", 2)
    const giraffe2 = new Giraffe("Giraffe2", 1, false, 2);
    const squirrel2 = new Squirrel('s2', 1, false, 'Maple', 44, 4)
    const lion2 = new Lion('mufasa', 1, false)
    const elephant2 = new Elephant("Giraffe2", 1, false, 2, 258);
    animalShelter.addAnimal(tortoise)
    animalShelter.addAnimal(crock1)
    animalShelter.addAnimal(snake2)
    animalShelter.addAnimal(lion2)
    animalShelter.addAnimal(giraffe2)
    animalShelter.addAnimal(elephant2)
    animalShelter.addAnimal(squirrel2)
    expect(animalShelter.reportOfNeededSpace([crock1, tortoise, snake2, lion2, squirrel2, giraffe2, elephant2])).toBe(770)
  })
  test('reportOfNeededSpace should return the needed space for adults only', () => {
    const animalShelter = AnimalShelter.getInstance()
    const tortoise = new Tortoise('t1', 3, false)
    const crock1 = new Crocodile("Crocko", 3, true, 5);
    const snake2 = new Snake("ssss", 3, "Anaconda", false, "green", 2)
    const giraffe2 = new Giraffe("Giraffe2", 3, false, 2);
    const squirrel2 = new Squirrel('s2', 3, false, 'Maple', 44, 4)
    const lion2 = new Lion('mufasa', 3, false)
    const elephant2 = new Elephant("Giraffe2", 3, false, 2, 258);
    animalShelter.addAnimal(tortoise)
    animalShelter.addAnimal(crock1)
    animalShelter.addAnimal(snake2)
    animalShelter.addAnimal(lion2)
    animalShelter.addAnimal(giraffe2)
    animalShelter.addAnimal(elephant2)
    animalShelter.addAnimal(squirrel2)
    expect(animalShelter.reportOfNeededSpace([crock1, tortoise, snake2, lion2, squirrel2, giraffe2, elephant2])).toBe(1540)
  })
  test('reportOfNeededSpace should return the needed space for no only', () => {
    const animalShelter = AnimalShelter.getInstance()
    expect(animalShelter.reportOfNeededSpace([])).toBe(0)
  })
  test("should succesfully set shelter trritory", () => {
    const animalShelter = AnimalShelter.getInstance();
    animalShelter.setShelterTerritory(2000);
    expect(animalShelter.getShelterTerritory()).toBe(2000);
  });
  test("should throw an error if shelter trritory set to negative", () => {
    const animalShelter = AnimalShelter.getInstance();
    expect(() => { animalShelter.setShelterTerritory(-2000) }).toThrow(NEGATIVE_SHELTER_TERRITORY);
  });

  test("report should return an object with the correct number of animals with specific abilities", () => {
    const animalShelter = AnimalShelter.getInstance();
    const tortoise = new Tortoise("t1", 3, false);
    const tortoise2 = new Tortoise("t2", 4, false);
    const squirrel = new Squirrel("s1", 3, false, "Maple", 44, 4);
    const lion = new Lion("simba", 4, true);
    animalShelter.addAnimal(tortoise);
    animalShelter.addAnimal(tortoise2);
    animalShelter.addAnimal(squirrel);
    animalShelter.addAnimal(lion);
    const animals = animalShelter.report();
    expect(animals.anaimalsWhoClimbTrees).toBe(4);
    expect(animals.animalsWhoJump).toBe(2);
    expect(animals.animalsWhoRun).toBe(1);
  });
})
