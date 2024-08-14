import { TreeType } from "../customTypes";
import { squirrels } from "../app";
import { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanJump } from "../interfaces/ICanJump";

export default class Squirrel extends Mammal implements ICanJump {
  private treeType: TreeType;
  private treeAge: number;
  private holeSize: number;
  private storedNuts = 0;

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
    squirrels.push(this);
  };
  jump(): void {
    throw new Error("Method not implemented.");
  };

  addNuts(numberOfNuts: number): void {
    if (numberOfNuts < 0) {
      console.log(`Cannot add a negative number of Nuts`);
      return;
    }
    if (this.storedNuts + numberOfNuts <= this.holeSize) {
      this.storedNuts += numberOfNuts;
    } else
      console.log(
        `${this.name} hole has space left only for ${this.holeSize - this.storedNuts
        } nuts`
      );
  };
  public giveBirth(numberOfChildren:number): void {
    const candidateSquirrels: AnimalCandidate[] = super.giveBirth(numberOfChildren) as AnimalCandidate[];
    if (candidateSquirrels) {
      candidateSquirrels.forEach(squirrelObjectInfo => {
        const babySquirrel = new Squirrel(squirrelObjectInfo.name, 0, squirrelObjectInfo.isMale, this.treeType, this.treeAge, this.holeSize);
        babySquirrel.home = this.home;
      });
    };
  };

  setHome(home: string | undefined): void {
    this.home = home;
  };
}
