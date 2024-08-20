import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
import Squirrel from "../animals/Squirrel";
import Tortoise from "../animals/Tortoise";
import Snake from "../animals/Snake";
import Animal from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
import { forEach } from "lodash";
const DEFAULT_MAMMAL_LIMIT = 20;
const DEFAULT_REPTILE_LIMIT = 19;
export default class AnimalShelter {
  private static instance: AnimalShelter;
  private _mammalLimit: number = DEFAULT_MAMMAL_LIMIT;
  private _reptileLimit: number = DEFAULT_REPTILE_LIMIT;

  private animals: Animal[] = [];

  private constructor() { }


  static getInstance() {
    if (!AnimalShelter.instance) {
      AnimalShelter.instance = new AnimalShelter();
    }
    return AnimalShelter.instance;
  }

  private getMammalsCount() {
    return this.animals.filter(x => x instanceof Mammal).length;
  }

  getMammalLimit() {
    return this._mammalLimit;
  }
  setMammalLimit(newMammalLimit: number) {
    if (newMammalLimit < 0) {
      console.log(`Limit cannot be negative`);
      return;
    }
    const mamalsTotal = this.getMammalsCount();
    if (newMammalLimit >= mamalsTotal) {
      this._mammalLimit = newMammalLimit;
      console.log("New Mammal Limit is now : " + this._mammalLimit);
    } else {
      console.log(
        `Cannot change mammal limit to ${newMammalLimit} there are already ${mamalsTotal} mammals`
      );
    }
  }

  private getReptileCount() {
    return this.animals.filter(x => x instanceof Reptile).length;
  }
  getReptileLimit() {
    return this._reptileLimit;
  }
  setReptileLimit(newReptileLimit: number) {
    if (newReptileLimit < 0) {
      console.log(`Limit cannot be negative`);
      return;
    }
    const reptilesTotal = this.getReptileCount();
    if (newReptileLimit >= reptilesTotal) {
      this._reptileLimit = newReptileLimit;
      console.log("New Reptile Limit is now : " + this._reptileLimit);
    } else {
      console.log(
        `Cannot change reptile limit to ${newReptileLimit} there ${reptilesTotal == 1 ? "is" : "are"} already ${reptilesTotal} ${reptilesTotal == 1 ? "reptile" : "reptile"}`
      );
    };
  };

  private hasMethod(animal: Animal, methodName: string): boolean {
    return typeof (animal as any)[methodName] === "function";
  };

  public report() {
    let animalsWhoJump = 0;
    let animalsWhoRun = 0;
    let anaimalsWhoClimbTrees = 0
    for (const animal of this.animals) {
      if (this.hasMethod(animal, "jump")) {
        animalsWhoJump++
      }
      if (this.hasMethod(animal, "run")) {
        animalsWhoRun++;
      }
      if (animal._canClimbTrees) {
        anaimalsWhoClimbTrees++;
      }
    }

    console.log(animalsWhoJump + ` animals can jump`);
    console.log(animalsWhoRun + ` animals can run`);
    console.log(anaimalsWhoClimbTrees + ` animals can climb trees`);
  };


  showAnimals() {

    console.log(this.animals);
    console.log("mammals: " + this.getMammalsCount());
    console.log("reptiles: " + this.getReptileCount());
    console.log(`lions: ${this.animals.filter(lion => lion instanceof Lion).length}`);
    console.log(`crocodiles: ${this.animals.filter(crocodile => crocodile instanceof Crocodile).length}`);
    console.log(`squirrels: ${this.animals.filter(squirrel => squirrel instanceof Squirrel).length}`);
    console.log(`snakes: ${this.animals.filter(snake => snake instanceof Snake).length}`);
    console.log(`tortoises: ${this.animals.filter(tortoise => tortoise instanceof Tortoise).length}`);
  }

  addAnimal(animal: Animal): void {

    if (animal instanceof Reptile && this.getReptileCount() + 1 > this._reptileLimit) {
      console.error(
        "Sorry, there is no space for another reptile in the Animal Shelter!"
      );
      return;
    }
    else if (animal instanceof Mammal && this.getMammalsCount() + 1 > this._mammalLimit) {
      console.error(
        "Sorry, there is no space for another mammal in the Animal Shelter!"
      );
      return;
    }
    const family = families.find(pack => pack.name === animal.getHome());
    if (!family || family.removeAnimal(animal)) {
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    }
  }
}