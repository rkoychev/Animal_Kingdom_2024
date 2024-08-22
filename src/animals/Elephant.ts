import { families } from "../app";
import Animal, { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
const NUMBER_OF_BABY_ELEPHANTS_BORN = 1;

export default class Elephant extends Mammal implements ICanRun, ICanTalk {
  private height: number;
  private weight: number;
  private numberOfBabiesBorn = NUMBER_OF_BABY_ELEPHANTS_BORN;
  constructor(
    name: string,
    age: number,
    isMale: boolean,
    height: number,
    weight: number
  ) {
    super(name, age, isMale);
    if (height <= 0) {
      throw Error("Elephant height must be greater than zero!");
    }
    if (weight <= 0) {
      throw Error("Elephant weight must be greater than zero!");
    }
    this._canHaveFamily = true;
    this.canRun = true;
    this.height = height;
    this.weight = weight;
  }

  run(): void {
    console.log(`${this.name} is running`);
  }
  talk(): void {
    console.log(`${this.name} is talking`);
  }

  public giveBirth(): void {
    const family = families.find((elephant) => elephant.name == this.home);
    const candidateElephants: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn
    );
    if (candidateElephants) {
      candidateElephants.forEach((elephantObjectInfo) => {
        const babyElephantHeight = this.generateRandomHeight(0.8, 1.2);
        const babyElephantWeight = this.generateRandomWeight(65, 75);
        const babyLion = new Elephant(
          elephantObjectInfo.name,
          0,
          elephantObjectInfo.isMale,
          babyElephantHeight,
          babyElephantWeight
        );
        family?.addAnimal(babyLion, true);
      });
    }
  }
}
