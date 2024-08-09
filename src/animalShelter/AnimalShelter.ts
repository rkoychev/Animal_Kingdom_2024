import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
import Squirrel from "../animals/Squirrel";
import Tortoise from "../animals/Tortoise";
import Snake from "../animals/Snake";
import Animal from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
const ANIMAL_SHELTER_MAMMAL_LIMIT = 20;
const ANIMAL_SHELTER_REPTILE_LIMIT = 19;
export default class AnimalShelter {
  private static instance: AnimalShelter;
  mammalLimit: number = ANIMAL_SHELTER_MAMMAL_LIMIT;
  reptileLimit: number = ANIMAL_SHELTER_REPTILE_LIMIT;

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

  private getReptileCount() {
    return this.animals.filter(x => x instanceof Reptile).length;
  }
  showAnimals() {

    console.log(this.animals);
    console.log("mammals: " + this.getMammalsCount());
    console.log("reptiles: " + this.getReptileCount());
    console.log(`lions: ${this.animals.filter(x => x instanceof Lion).length}`);
    console.log(`crocodiles: ${this.animals.filter(x => x instanceof Crocodile).length}`);
    console.log(`squirrels: ${this.animals.filter(x => x instanceof Squirrel).length}`);
    console.log(`snakes: ${this.animals.filter(x => x instanceof Snake).length}`);
    console.log(`tortoise: ${this.animals.filter(x => x instanceof Tortoise).length}`);
  }

  addAnimal(animal: Animal): void {

    if (this.getReptileCount() + 1 > this.reptileLimit) {
      console.error(
        "Sorry, there is no space for another reptile in the Animal Shelter!"
      );
      return;
    }
    else if (this.getMammalsCount() + 1 > this.mammalLimit) {
      console.error(
        "Sorry, there is no space for another mammal in the Animal Shelter!"
      );
      return;
    }
    let isRemovalValid: boolean = true;
    if (animal.getCanHaveFamily()) {
      const family = families.find(
        (pack) => pack.name === animal.getHome()
      );
      if (family) {
        isRemovalValid = family.removeAnimal(animal);
      }
    }
    if (isRemovalValid) {
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    }
  }
}