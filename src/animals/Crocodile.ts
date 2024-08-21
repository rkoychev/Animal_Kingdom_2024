import { NEGATIVE_LENGTH_ERROR_MESSAGE } from "../../messages/errorMessages";
import { families } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
export const NUMBER_OF_BABY_CROCODILES_BORN = 8;
export const NUMBER_OF_BABY_CROCODILES_BORN_RANDOM_GENDER = 5;
export const CROCS_SPACE_NEEDED_AS_ADULT = 300;
export const CROCS_SPACE_NEEDED_AS_CHILD = 150;

export default class Crocodile extends Reptile {
  private length: number;
  private numberOfBabiesBorn = NUMBER_OF_BABY_CROCODILES_BORN;
  private numberOfBabiesBornRandomGender =
    NUMBER_OF_BABY_CROCODILES_BORN_RANDOM_GENDER;

  constructor(name: string, age: number, isMale: boolean, length: number) {
    super(name, age, isMale);
    this._canHaveFamily = true;
    if (length <= 0) {
      throw new Error(NEGATIVE_LENGTH_ERROR_MESSAGE);
    }
    this.length = length;
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return CROCS_SPACE_NEEDED_AS_ADULT;
    } else {
      return CROCS_SPACE_NEEDED_AS_CHILD;
    }
  }
  public giveBirth() {
    const family = families.find((crcodile) => crcodile.name == this.home);
    const candidateCrocks: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn,
      this.numberOfBabiesBornRandomGender
    );
    const babies: Crocodile[] = [];
    let length: number;
    if (candidateCrocks) {
      candidateCrocks.forEach((crockObjectInfo) => {
        length = Math.floor(Math.random() * 4) + 1;
        const babyCrocodile = new Crocodile(
          crockObjectInfo.name,
          0,
          crockObjectInfo.isMale,
          length
        );
        family?.addAnimal(babyCrocodile, true);
        babies.push(babyCrocodile);
      });
    }
    return babies;
  }
}
