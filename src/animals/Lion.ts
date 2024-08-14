import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { families } from "../app";
import  { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanJump } from "../interfaces/ICanJump";

export default class Lion extends Mammal implements ICanRun, ICanTalk,ICanJump {
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);
    this._canHaveFamily = true;
  };

  jump(): void {
    throw new Error("Method not implemented.");
  };
  run(): void {
    console.log(`${this.name} is running`);
  };
  talk(): void {
    console.log(`${this.name} is talking`);
  };

  public giveBirth(numberOfChildren:number): void {
    const family = families.find(x=>x.name == this.home);
    const candidateLions: AnimalCandidate[] = super.giveBirth(numberOfChildren) as AnimalCandidate[];

    if (candidateLions) {
      candidateLions.forEach(lionObjectInfo => {
        const babyLion = new Lion(lionObjectInfo.name, 0, lionObjectInfo.isMale);
        family?.addAnimal(babyLion,true);
      });
    };
  };
};
