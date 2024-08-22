import { tortoises } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Reptile from "../hierarchy/Reptile";
export const NUMBER_OF_BABY_TORTOISES_BORN = 8;
export const NUMBER_OF_BABY_TORTOISES_BORN_RANDOM_GENDER = 5;

export default class Tortoise extends Reptile {
  private numberOfBabiesBorn = NUMBER_OF_BABY_TORTOISES_BORN;
  private numberOfBabiesBornRandomGender =
    NUMBER_OF_BABY_TORTOISES_BORN_RANDOM_GENDER;
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);

    this.home = "Animal Kingdom";
    this.canClimbTrees = true;
    tortoises.push(this);
  }

  public giveBirth(): Tortoise[] {
    const candidateTortoises: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn,
      this.numberOfBabiesBornRandomGender
    );
    const babies: Tortoise[] = [];
    candidateTortoises?.forEach((tortoiseObjectInfo) => {
      const babyTortoise = new Tortoise(
        tortoiseObjectInfo.name,
        0,
        tortoiseObjectInfo.isMale
      );
      babyTortoise.home = this.home;
      babies.push(babyTortoise);
    });
    return babies;
  }
}
