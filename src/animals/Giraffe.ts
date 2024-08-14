import { families } from "../app";
import Animal, { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { ICanWalk } from "../interfaces/ICanWalk";

export default class Giraffe extends Mammal implements ICanRun {
    height:number;
    constructor(
        name: string, 
        age: number, 
        isMale: boolean, 
        height: number
    ) {
      super(name, age, isMale);
      if(height <=0){
        throw Error("Elephant height must be greater than zero!")
      };
      this._canHaveFamily = true;
      this.height = height;
    };  
  
    run(): void {
      console.log(`${this.name} is running`);
    };
  
    public  giveBirth(): void {
        const family = families.find(giraffe =>giraffe.name == this.home);
        const candidateGiraffes: AnimalCandidate[] = super.giveBirth(1) as AnimalCandidate[];
        if (candidateGiraffes) {
            candidateGiraffes.forEach(giraffeObjectInfo => {
            const babyGiraffeHeight = Math.round((Math.random() * (1.8 - 1.5) + 1.5) * 100) / 100;
            const babyGiraffe = new Giraffe(
                giraffeObjectInfo.name, 
                0, 
                giraffeObjectInfo.isMale, 
                babyGiraffeHeight
            );
            family?.addAnimal(babyGiraffe,true);
            });  
        };
    };
};
  