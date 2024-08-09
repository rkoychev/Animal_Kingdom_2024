import { tortoises } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";

export default class Tortoise extends Reptile {
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);

    this.home = "Animal Kingdom";
    tortoises.push(this);
  };

  public giveBirth(): void {
    const candidateTortoises: AnimalCandidate[] = super.giveBirth() as AnimalCandidate[];
    if (candidateTortoises) {
      candidateTortoises.forEach(tortoiseObjectInfo => {
        const babyTortoise = new Tortoise(tortoiseObjectInfo.name, 0, tortoiseObjectInfo.isMale);
        babyTortoise.home = this.home;
      });
    };
  };
};
