import { MammalAnimalType, ReptileAnimalType, TreeType } from "../customTypes";
import { squirrels } from "../app";
import Mammal from "../hierarchy/Mammal";
export default class Squirrel
  extends Mammal
{
  private type: MammalAnimalType = "Squirrel";
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
  giveBirth(): void {
    if (this.isMale) {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else {
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const isMale: boolean = num === 1;
        const age: number = 0;
        new Squirrel(
          name,
          age,
          isMale,
          this.treeType,
          this.treeAge,
          this.holeSize
        );
      }
      console.log(`${this.name} gives birth`);
    }
  }

  getType(): ReptileAnimalType | MammalAnimalType {
    return this.type;
  }
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
