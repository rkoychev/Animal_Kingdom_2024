import { families } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
const NUMBER_OF_BABY_CROCODILES_BORN = 8;
const NUMBER_OF_BABY_CROCODILES_BORN_RANDOM_GENDER = 5;

export default class Crocodile extends Reptile {
  private length: number;
  private numberOfBabiesBorn = NUMBER_OF_BABY_CROCODILES_BORN;
  private numberOfBabiesBornRandomGender = NUMBER_OF_BABY_CROCODILES_BORN_RANDOM_GENDER;


  constructor(name: string, age: number, isMale: boolean, length: number) {
    super(name, age, isMale);
    this._canHaveFamily = true;
    if (length <= 0) {
      throw new Error("Length must be greater than zero");
    }
    this.length = length;
    this._canClimbTrees =true;
  }

  public giveBirth(): void {
    const family = families.find(x => x.name == this.home);
    const candidateCrocks: AnimalCandidate[] =
      this.generateBabyProperties(this.numberOfBabiesBorn, this.numberOfBabiesBornRandomGender);
    let length: number;
    if (candidateCrocks) {
      candidateCrocks.forEach(crockObjectInfo => {
        length = Math.floor(Math.random() * 4) + 1;
        const babyCrocodile = new Crocodile(crockObjectInfo.name, 0, crockObjectInfo.isMale, length);
        family?.addAnimal(babyCrocodile, true);
      });
    };
  };
}
