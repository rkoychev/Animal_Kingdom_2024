import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { families } from "../app";
import  { AnimalCandidate } from "../hierarchy/Animal";

import Mammal from "../hierarchy/Mammal";
export default class Lion extends Mammal implements ICanRun, ICanTalk {
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);
    this._canHaveFamily = true;
  }

  run(): void {
    console.log(`${this.name} is running`);
  }
  talk(): void {
    console.log(`${this.name} is talking`);
  }

  public giveBirth(): void {
    const candidateLions: AnimalCandidate[] = super.giveBirth() as AnimalCandidate[];
    if (candidateLions) {
      candidateLions.forEach(lionObjectInfo => {
        const babyLion = new Lion(lionObjectInfo.name, 0, lionObjectInfo.isMale);
        families.forEach((family) => {
          if (family.name === this.home) {
            family.addAnimal(babyLion, true);
          }
        });
      });
    }
  }
}
