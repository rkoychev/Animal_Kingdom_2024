import { families } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";

export default class Crocodile extends Reptile {
  private length: number;
  constructor(name: string, age: number, isMale: boolean, length: number) {
    super(name, age, isMale);
    this._canHaveFamily = true;
    if (length <= 0) {
      throw new Error("Length must be greater than zero");
    }
    this.length = length;
  }


  public giveBirth(): void {
    const candidateCrocks: AnimalCandidate[] = super.giveBirth() as AnimalCandidate[];
    let length: number;
    if (candidateCrocks) {
      candidateCrocks.forEach(crockObjectInfo => {
        length = Math.floor(Math.random() * 5);
        const babyCrocodile = new Crocodile(crockObjectInfo.name, 0, crockObjectInfo.isMale, length);
        families.forEach((family) => {
          if (family.name === this.home) {
            family.addAnimal(babyCrocodile, true);
          };
        });
      });

    };
  };
}
