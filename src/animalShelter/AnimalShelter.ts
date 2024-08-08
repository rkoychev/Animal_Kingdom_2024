import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
import Squirrel from "../animals/Squirrel";
import Tortoise from "../animals/Tortoise";
import Snake from "../animals/Snake";
import Animal from "../hierarchy/Animal";
const DEFAULT_MAMMAL_LIMIT = 20;
const DEFAULT_REPTILE_LIMIT = 19;
export default class AnimalShelter {
  private static instance: AnimalShelter;
  private _mammalLimit: number = DEFAULT_MAMMAL_LIMIT;
  private _reptileLimit: number = DEFAULT_REPTILE_LIMIT;
  private lions = 0;
  private crocodiles = 0;
  private snakes = 0;
  private squirrels = 0;
  private tortoise = 0;
  private animals: Animal[] = [];

  private constructor() {}

  static getInstance() {
    if (!AnimalShelter.instance) {
      AnimalShelter.instance = new AnimalShelter();
    }
    return AnimalShelter.instance;
  }

  private get mammalsNumber() {
    return this.lions + this.squirrels;
  }

  private get reptileNumbers() {
    return this.snakes + this.crocodiles + this.tortoise;
  }
  setMammalLimit(newMammalLimit: number) {
    if (newMammalLimit < 0) {
      console.log(`Limit cannot be negative`);
      return;
    }
    const mamalsTotal = this.lions + this.squirrels;
    if (newMammalLimit >= mamalsTotal) {
      this._mammalLimit = newMammalLimit;
      console.log("New Mammal Limit is now : " + this._mammalLimit);
    } else {
      console.log(
        `Cannot change mammal limit to ${newMammalLimit} there are already ${mamalsTotal} mammals`
      );
    }
  }
  setReptileLimit(newReptileLimit: number) {
    if (newReptileLimit < 0) {
      console.log(`Limit cannot be negative`);
      return;
    }
    const reptilesTotal = this.crocodiles + this.snakes + this.tortoise;
    if (newReptileLimit >= reptilesTotal) {
      this._reptileLimit = newReptileLimit;
      console.log("New Reptile Limit is now : " + this._reptileLimit);
    } else {
      console.log(
        `Cannot change reptile limit to ${newReptileLimit} there are already ${reptilesTotal} reptiles`
      );
    }
  }
  getMammalLimit() {
    return this._mammalLimit;
  }
  getReptileLimit() {
    return this._reptileLimit;
  }

  showAnimals() {
    console.log(this.animals);
    console.log(`lions: ${this.lions}`);
    console.log(`crocodiles: ${this.crocodiles}`);
    console.log(`snakes: ${this.snakes}`);
    console.log(`tortoise: ${this.tortoise}`);
  }

  addAnimal(animal: Animal): void {
    if (animal instanceof Mammal) {
      if (this.mammalsNumber >= this._mammalLimit) {
        console.log(
          "Sorry, there is no space for another mammal in the Animal Shelter!"
        );
        return;
      }

      if (animal instanceof Lion) {
        if (animal.getHome() !== undefined) {
          const family = families.find(
            (pack) => pack.name === animal.getHome()
          );
          family?.removeAnimal(animal as Lion);
          animal.setHome(undefined);
        }
        this.lions++;
      } else if (animal instanceof Squirrel) {
        this.squirrels++;
      }
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    } else if (animal) {
      if (this.reptileNumbers >= this._reptileLimit) {
        console.log(
          "Sorry, there is no space for another reptile in the Animal Shelter!"
        );
        return;
      }
      if (animal instanceof Crocodile) {
        if (animal.getHome() !== undefined) {
          const pack = families.find((pack) => pack.name === animal.getHome());
          pack?.removeAnimal(animal);
          animal.setHome(undefined);
        }
        this.crocodiles++;
      } else if (animal instanceof Tortoise) {
        this.tortoise++;
      } else if (animal instanceof Snake) {
        this.snakes++;
      }
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    }
  }
}
