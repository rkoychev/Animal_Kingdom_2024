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
  giveBirth(): [string, number,boolean,string][] {
    const squirrelsTuples = super.giveBirth();
    for(var squirrelTuple of squirrelsTuples){
      const babysquirrel = new Squirrel(squirrelTuple[0], 0, squirrelTuple[2],this.treeType,this.treeAge,this.holeSize);
      babysquirrel.home = squirrelTuple[3];
    }
    return[["",0,false,""]];
  }

  getType(): ReptileAnimalType | MammalAnimalType {
    return this.type;
  }
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
