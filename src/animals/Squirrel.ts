import { TreeType } from "../customTypes";
import { squirrels } from "../app";
import { AGE_TO_BE_ADULT, AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanJump } from "../interfaces/ICanJump";
const NUMBER_OF_BABY_SQUIRRELS_BORN = 5;
export const SQUIRREL_SPACE_NEEDED_AS_ADULT = 40;
export const SQUIRREL_SPACE_NEEDED_AS_CHILD = 20;
export default class Squirrel extends Mammal implements ICanJump {
  private treeType: TreeType;
  private treeAge: number;
  private holeSize: number;
  private storedNuts = 0;
  private numberOfBabiesBorn: number = NUMBER_OF_BABY_SQUIRRELS_BORN;

  constructor(
    name: string,
    age: number,
    isMale: boolean,
    treeType: TreeType,
    treeAge: number,
    holeSize: number
  ) {
    super(name, age, isMale);
    if (holeSize <= 0) {
      throw new Error("Hole size must be greater than zero");
    }

    this.treeType = treeType;
    this.treeAge = treeAge;
    this.holeSize = holeSize;
    this.canClimbTrees = true;
    this.canJump = true;
    squirrels.push(this);
  }
  jump(): void {
    console.log(`${this.name} is jumping`);
  }

  addNuts(numberOfNuts: number): void {
    if (numberOfNuts < 0) {
      console.log(`Cannot add a negative number of Nuts`);
      return;
    }
    if (this.storedNuts + numberOfNuts <= this.holeSize) {
      this.storedNuts += numberOfNuts;
    } else
      console.log(
        `${this.name} hole has space left only for ${
          this.holeSize - this.storedNuts
        } nuts`
      );
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return SQUIRREL_SPACE_NEEDED_AS_ADULT;
    } else {
      return SQUIRREL_SPACE_NEEDED_AS_CHILD;
    }
  }
  public giveBirth(): void {
    const candidateSquirrels: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn
    );
    if (candidateSquirrels) {
      candidateSquirrels.forEach((squirrelObjectInfo) => {
        const babySquirrel = new Squirrel(
          squirrelObjectInfo.name,
          0,
          squirrelObjectInfo.isMale,
          this.treeType,
          this.treeAge,
          this.holeSize
        );
        babySquirrel.home = this.home;
      });
    }
  }

  setHome(home: string | undefined): void {
    this.home = home;
  }
}
