import { families } from "../app";
import Animal, { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanRun } from "../interfaces/ICanRun";
const NUMBER_OF_BABY_GIRAFFES_BORN = 1;
export const GIRAFFE_SPACE_NEEDED_AS_ADULT = 200;
export const GIRAFFE_SPACE_NEEDED_AS_CHILD = 100;

export default class Giraffe extends Mammal implements ICanRun {
  height: number;
  private numberOfBabiesBorn = NUMBER_OF_BABY_GIRAFFES_BORN;
  constructor(name: string, age: number, isMale: boolean, height: number) {
    super(name, age, isMale);
    if (height <= 0) {
      throw Error("Elephant height must be greater than zero!");
    }
    this._canHaveFamily = true;
    this.height = height;
  }

  run(): void {
    console.log(`${this.name} is running`);
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return GIRAFFE_SPACE_NEEDED_AS_ADULT;
    } else {
      return GIRAFFE_SPACE_NEEDED_AS_CHILD;
    }
  }
  public giveBirth(): void {
    const family = families.find((giraffe) => giraffe.name == this.home);
    const candidateGiraffes: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn
    );
    if (candidateGiraffes) {
      candidateGiraffes.forEach((giraffeObjectInfo) => {
        const babyGiraffeHeight = this.generateRandomHeight(1.5, 1.8);
        const babyGiraffe = new Giraffe(
          giraffeObjectInfo.name,
          0,
          giraffeObjectInfo.isMale,
          babyGiraffeHeight
        );
        family?.addAnimal(babyGiraffe, true);
      });
    }
  }
}
