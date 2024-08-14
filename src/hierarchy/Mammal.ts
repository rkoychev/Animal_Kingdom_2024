import { ICanJump } from "../interfaces/ICanJump";
import Animal from "./Animal";
import { AnimalCandidate } from "./Animal";

export default abstract class Mammal extends Animal {
    

    public giveBirth(numberOfChildren:number): AnimalCandidate[] | void {
        if (super.giveBirth(0,0)) {
            this.timesGivenBirth++;
            const candidatesforAnimals: AnimalCandidate[] = [];
            const numberOfMammalBabies = numberOfChildren;
            for (let i = 1; i <= numberOfMammalBabies; i++) {
                const name: string =
                    this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
                const isMale: boolean = Math.random() % 2 == 0 ? false : true;
                candidatesforAnimals.push({ name: name, isMale: isMale});
            }
            console.log(`${this.name} gives birth`);
            return candidatesforAnimals;
        };
    };
}
