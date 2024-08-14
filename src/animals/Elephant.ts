import { families } from "../app";
import Animal, { AnimalCandidate } from "../hierarchy/Animal";
import Mammal from "../hierarchy/Mammal";
import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { ICanWalk } from "../interfaces/ICanWalk";

export default class Elephant extends Mammal implements ICanRun, ICanTalk{
    height:number;
    weight:number;
    constructor(
        name: string, 
        age: number, 
        isMale: boolean, 
        height: number,
        weight:number 
    ) {
      super(name, age, isMale);
      if(height <=0){
        throw Error("Elephant height must be greater than zero!")
      }
      if(weight <=0){
        throw Error("Elephant weight must be greater than zero!")
      }
      this._canHaveFamily = true;
      this.height = height
      this.weight = weight;
    };  
  
    run(): void {
      console.log(`${this.name} is running`);
    };
    talk(): void {
      console.log(`${this.name} is talking`);
    };
  
    public  giveBirth(): void {
        const family = families.find(elephant =>elephant.name == this.home);
        const candidateElephants: AnimalCandidate[] = super.giveBirth(1) as AnimalCandidate[];
        if (candidateElephants) {
            candidateElephants.forEach(elephantObjectInfo => {
            const babyElephantHeight = Math.round((Math.random() * (1.2 - 0.8) + 0.8) * 100) / 100;
            const babyElephantWeight = Math.round((Math.random() * (75 - 65) + 65));
            const babyLion = new Elephant(
                elephantObjectInfo.name, 
                0, 
                elephantObjectInfo.isMale, 
                babyElephantHeight,
                babyElephantWeight
            );
            family?.addAnimal(babyLion,true);
            });  
        };
    };
};
  