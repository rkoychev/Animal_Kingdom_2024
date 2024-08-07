import { MammalAnimalType } from "../customTypes";
import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
export default class Lion
  extends Mammal
  implements  ICanRun, ICanTalk
{
  private type: MammalAnimalType = "Lion";

  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);
  }
  
  run(): void {
    console.log(`${this.name} is running`);
  }
  talk(): void {
    console.log(`${this.name} is talking`);
  }

  giveBirth(): [string, number,boolean,string][] {

    const lionsTuples = super.giveBirth();
    for(var lionTuple of lionsTuples){
    
      const babyLion = new Lion(lionTuple[0], 0, lionTuple[2]);
      families.forEach((family) => {
        if (family.name === this.home) {
          family.addAnimal(babyLion, true);
        }
      });
    }
    return[["",0,false,""]];
  }
  
  getType() {
    return this.type;
  }
}
