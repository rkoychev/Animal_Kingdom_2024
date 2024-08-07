import { ReptileAnimalType } from "../customTypes";
import { families } from "../app";
import Reptile from "../hierarchy/Reptile";

export default class Crocodile
  extends Reptile
{
  private length: number;
  private type: ReptileAnimalType = "Crocodile";
  constructor(name: string, age: number, isMale: boolean, length: number) {
    super(name, age, isMale);
    if (length <= 0) {
      throw new Error("Length must be greater than zero");
    }
    this.length = length;
  }
  
  
  giveBirth(): [string, number, boolean,string][] {
    const crocodilesTuples = super.giveBirth();
    for (var crocodileTuple of crocodilesTuples) {

      const babySnake = new Crocodile(crocodileTuple[0], 0, crocodileTuple[2], 10);
      families.forEach((family) => {
        if (family.name === this.home) {
          family.addAnimal(babySnake, true);
        }
      });
    }
    return [["", 0, false,""]];
  }
  
  getType() {
    return this.type;
  }
}
