import { ReptileAnimalType } from "../customTypes";
import { tortoises } from "../app";
import Reptile from "../hierarchy/Reptile";

export default class Tortoise
  extends Reptile
{
  private type: ReptileAnimalType = "Tortoise";

  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);

    this.home = "Animal Kingdom";
    tortoises.push(this);
  }
  
  giveBirth(): [string, number,boolean,string][] {
    const tortoisesTuples = super.giveBirth();
    for(var tortoiseTuple of tortoisesTuples){
    
     const babySnake = new Tortoise(tortoiseTuple[0], 0, tortoiseTuple[2]);
     babySnake.home = tortoiseTuple[3];
    }
    return[["",0,false,""]];
  }
  getType() {
    return this.type;
  }
}
