import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
import Squirrel from "../animals/Squirrel";
import Tortoise from "../animals/Tortoise";
import Snake from "../animals/Snake";
import Animal from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
import {
  FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY,
  NEGATIVE_LIMIT_ERROR_MESSAGE,
  NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS,
  NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES,
  NO_SPACE_FOR_MORE_MAMMALS,
  NO_SPACE_FOR_MORE_REPTILES,
} from "../../messages/errorMessages";
const DEFAULT_MAMMAL_LIMIT = 20;
const DEFAULT_REPTILE_LIMIT = 19;
export default class AnimalShelter {
  private static instance: AnimalShelter;
  private _mammalLimit: number = DEFAULT_MAMMAL_LIMIT;
  private _reptileLimit: number = DEFAULT_REPTILE_LIMIT;

  private animals: Animal[] = [];

  private constructor() {}

  static getInstance() {
    if (!AnimalShelter.instance) {
      AnimalShelter.instance = new AnimalShelter();
    }
    return AnimalShelter.instance;
  }
  static resetInstance() {
    AnimalShelter.instance = new AnimalShelter();
  }

  private getMammalsCount() {
    return this.animals.filter((x) => x instanceof Mammal).length;
  }

  getMammalLimit() {
    return this._mammalLimit;
  }
  setMammalLimit(newMammalLimit: number): string {
    if (newMammalLimit < 0) {
      return NEGATIVE_LIMIT_ERROR_MESSAGE;
    }
    const mamalsTotal = this.getMammalsCount();
    if (newMammalLimit >= mamalsTotal) {
      this._mammalLimit = newMammalLimit;
      return "Succesfully set new mammal limit";
    } else {
      return NEW_MAMMAL_LIMIT_LESS_THAN_CURRENT_MAMMALS;
    }
  }
  private getReptileCount() {
    return this.animals.filter((x) => x instanceof Reptile).length;
  }
  getReptileLimit() {
    return this._reptileLimit;
  }
  setReptileLimit(newReptileLimit: number): string {
    if (newReptileLimit < 0) {
      return `Limit cannot be negative`;
    }
    const reptilesTotal = this.getReptileCount();
    if (newReptileLimit >= reptilesTotal) {
      this._reptileLimit = newReptileLimit;
      return "Succesfully set new reptile limit";
    } else {
      return NEW_REPTILE_LIMIT_LESS_THAN_CURRENT_REPTILES;
    }
  }

  showAnimals() {
    const animalNumbers: {
      mamamls: number;
      reptiles: number;
      lions: number;
      crocodiles: number;
      squirrels: number;
      snakes: number;
      tortoises: number;
    } = {
      mamamls: this.getMammalsCount(),
      reptiles: this.getReptileCount(),
      lions: this.animals.filter((lion) => lion instanceof Lion).length,
      crocodiles: this.animals.filter(
        (crocodile) => crocodile instanceof Crocodile
      ).length,
      squirrels: this.animals.filter((squirrel) => squirrel instanceof Squirrel)
        .length,
      snakes: this.animals.filter((snake) => snake instanceof Snake).length,
      tortoises: this.animals.filter((tortoise) => tortoise instanceof Tortoise)
        .length,
    };
    return animalNumbers;
  }

  addAnimal(animal: Animal): string {
    if (
      animal instanceof Reptile &&
      this.getReptileCount() + 1 > this._reptileLimit
    ) {
      return NO_SPACE_FOR_MORE_REPTILES;
    } else if (
      animal instanceof Mammal &&
      this.getMammalsCount() + 1 > this._mammalLimit
    ) {
      return NO_SPACE_FOR_MORE_MAMMALS;
    }
    const family = families.find((pack) => pack.name === animal.getHome());
    if (!family || family.removeAnimal(animal)) {
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      return `${animal.getName()} has been added to the Animal Shelter`;
    } else return FAILED_TO_REMOVE_ANIMAL_FROM_FAMILY;
  }
}
