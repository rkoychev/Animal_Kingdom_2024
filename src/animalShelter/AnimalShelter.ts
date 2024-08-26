import Crocodile from '../animals/Crocodile'
import Lion from '../animals/Lion'
import { families } from '../app'
import Mammal from '../hierarchy/Mammal'
import Squirrel from '../animals/Squirrel'
import Tortoise from '../animals/Tortoise'
import Snake from '../animals/Snake'
import Animal from '../hierarchy/Animal'
import Reptile from '../hierarchy/Reptile'
import {
  FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY,
  NEGATIVE_LIMIT_ERROR_MESSAGE,
  NEGATIVE_SHELTER_TERRITORY,
  NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS,
  NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES,
  NO_SPACE_FOR_MORE_MAMMALS,
  NO_SPACE_FOR_MORE_REPTILES,
} from '../../messages/errorMessages'
import {
  SUCCESFULLY_ADDED_ANIMAL_IN_SHELTER,
  SUCCESFULLY_SET_NEW_MAMMAL_LIMIT,
  SUCCESFULLY_SET_NEW_REPTILE_LIMIT,
} from '../../messages/successMessages'
const DEFAULT_MAMMAL_LIMIT = 20
const DEFAULT_REPTILE_LIMIT = 19
const DEFAULT_SHELTER_TERRITORY = 1500
export default class AnimalShelter {
  private static instance: AnimalShelter
  private _mammalLimit: number = DEFAULT_MAMMAL_LIMIT
  private _reptileLimit: number = DEFAULT_REPTILE_LIMIT
  private _shelterTerritory: number = DEFAULT_SHELTER_TERRITORY
  private animals: Animal[] = []

  private constructor() {}

  static getInstance() {
    if (!AnimalShelter.instance) {
      AnimalShelter.instance = new AnimalShelter()
    }
    return AnimalShelter.instance
  }

  public reportOfNeededSpace(animals: Animal[]): number {
    return animals.reduce((neededSpace, animal) => neededSpace + animal.getSpaceNeeded(), 0);
  }

  public resetInstance() {
    this.animals = []
    this._mammalLimit = DEFAULT_MAMMAL_LIMIT
    this._reptileLimit = DEFAULT_REPTILE_LIMIT
    this._shelterTerritory = DEFAULT_SHELTER_TERRITORY
  }
  getShelterTerritory(): number {
    return this._shelterTerritory
  }
  setShelterTerritory(newTerritory: number) {
    if (newTerritory <= 0) {
      throw new Error(NEGATIVE_SHELTER_TERRITORY)
    }
    this._shelterTerritory = newTerritory
  }

  private getMammalsCount() {
    return this.animals.filter((animal) => animal instanceof Mammal).length
  }
  getMammalLimit() {
    return this._mammalLimit
  }
  setMammalLimit(newMammalLimit: number): string {
    if (newMammalLimit < 0) {
      return NEGATIVE_LIMIT_ERROR_MESSAGE
    }
    const mamalsTotal = this.getMammalsCount()
    if (newMammalLimit >= mamalsTotal) {
      this._mammalLimit = newMammalLimit
      return SUCCESFULLY_SET_NEW_MAMMAL_LIMIT
    } else {
      return NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS
    }
  }
  private getReptileCount() {
    return this.animals.filter((animal) => animal instanceof Reptile).length
  }
  getReptileLimit() {
    return this._reptileLimit
  }
  setReptileLimit(newReptileLimit: number): string {
    if (newReptileLimit < 0) {
      return NEGATIVE_LIMIT_ERROR_MESSAGE
    }
    const reptilesTotal = this.getReptileCount()
    if (newReptileLimit >= reptilesTotal) {
      this._reptileLimit = newReptileLimit
      return SUCCESFULLY_SET_NEW_REPTILE_LIMIT
    } else {
      return NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES
    }
  }

  public report() {
    const animalNumbers: {
      animalsWhoJump: number
      animalsWhoRun: number
      anaimalsWhoClimbTrees: number
    } = {
      animalsWhoJump: 0,
      animalsWhoRun: 0,
      anaimalsWhoClimbTrees: 0,
    }
    for (const animal of this.animals) {
      if (animal.canJump) {
        animalNumbers.animalsWhoJump++
      }
      if (animal.canRun) {
        animalNumbers.animalsWhoRun++
      }
      if (animal.canClimbTrees) {
        animalNumbers.anaimalsWhoClimbTrees++
      }
    }
    return animalNumbers
  }

  showAnimals() {
    const animalNumbers: {
      mamamls: number
      reptiles: number
      lions: number
      crocodiles: number
      squirrels: number
      snakes: number
      tortoises: number
    } = {
      mamamls: this.getMammalsCount(),
      reptiles: this.getReptileCount(),
      lions: this.animals.filter((animal) => animal instanceof Lion).length,
      crocodiles: this.animals.filter((crocodile) => crocodile instanceof Crocodile).length,
      squirrels: this.animals.filter((animal) => animal instanceof Squirrel).length,
      snakes: this.animals.filter((animal) => animal instanceof Snake).length,
      tortoises: this.animals.filter((animal) => animal instanceof Tortoise).length,
    }
    return animalNumbers
  }

  addAnimal(animal: Animal): string {
    if (animal instanceof Reptile && this.getReptileCount() + 1 > this._reptileLimit) {
      return NO_SPACE_FOR_MORE_REPTILES
    } else if (animal instanceof Mammal && this.getMammalsCount() + 1 > this._mammalLimit) {
      return NO_SPACE_FOR_MORE_MAMMALS
    }
    const family = families.find((pack) => pack.name === animal.getHome())
    if (!family || family.removeAnimal(animal)) {
      this.animals.push(animal)
      animal.setHome('Animal Shelter')
      return `${animal.getName()} ${SUCCESFULLY_ADDED_ANIMAL_IN_SHELTER}`
    } else return FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY
  }
}
