import { TreeType } from "../customTypes";
import { squirrels } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanJump } from "../interfaces/ICanJump";
import { NEGATIVE_HOLE_SIZE, NEGATIVE_NUTS_ADDED, NEGATIVE_TREE_AGE } from "../../messages/errorMessages";
export const NUMBER_OF_BABY_SQUIRRELS_BORN = 5;
export default class Squirrel extends Mammal implements ICanJump {
  private treeType: TreeType;
  private treeAge: number;
  private nutsLimit: number;
  private storedNuts = 0;
  private numberOfBabiesBorn: number = NUMBER_OF_BABY_SQUIRRELS_BORN;

  constructor(
    name: string,
    age: number,
    isMale: boolean,
    treeType: TreeType,
    treeAge: number,
    nutsLimit: number
  ) {
    super(name, age, isMale);
    if (nutsLimit <= 0) {
      throw new Error(NEGATIVE_HOLE_SIZE);
    }
    if (treeAge <= 0) {
      throw new Error(NEGATIVE_TREE_AGE);
    }

    this.treeType = treeType;
    this.treeAge = treeAge;
    this.nutsLimit = nutsLimit;
    this.setHome(treeType + " tree");
    squirrels.push(this);
  };
  jump(): string {
    return `${this.name} is jumping`;
  };

  addNuts(numberOfNuts: number) {
    if (numberOfNuts < 0) {
      throw Error(NEGATIVE_NUTS_ADDED);
    }
    if (this.storedNuts + numberOfNuts <= this.nutsLimit) {
      this.storedNuts += numberOfNuts;
    } else
      throw Error(
        `${this.name} hole has space left only for ${this.nutsLimit - this.storedNuts
        } nuts`
      );
  };
  public giveBirth(): Squirrel[] {
    const candidateSquirrels: AnimalCandidate[] = this.generateBabyProperties(this.numberOfBabiesBorn);
    const babies: Squirrel[] = [];
    candidateSquirrels?.forEach(squirrelObjectInfo => {
      const babySquirrel = new Squirrel(squirrelObjectInfo.name, 0, squirrelObjectInfo.isMale, this.treeType, this.treeAge, this.nutsLimit);
      babySquirrel.home = this.home;
      babies.push(babySquirrel);
    });
    return babies;
  };

}
