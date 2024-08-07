import { ICanJump } from "../interfaces/ICanJump";
import Animal from "./Animal";

export default abstract class Mammal extends Animal implements ICanJump {
    jump(): void {
        console.log(`${this.name} is jumping`);
    }
    
    
    giveBirth(): [string, number, boolean,string][] {
        if (this.isMale) {
            throw Error(
                `Only Females can give birth and ${this.name} is a proud male ${this.constructor.name}`
            );
        } else if (this.home === undefined) {
            throw Error(
                `${this.name} can't give birth because she doesn't have a home to meet a male`
            );
        } else {
            this.timesGivenBirth += 1;
            const candidatesforAnimals:[string, number, boolean,string][] = []
            for (let i = 1; i <= 5; i++) {
                
                const name: string =
                    this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
                const isMale: boolean = Math.random() % 2 == 0 ? false : true;
                candidatesforAnimals.push([name,0,isMale,this.home]);
            }
            console.log(`${this.name} gives birth`);
            return candidatesforAnimals;
        }

    };
  }
  