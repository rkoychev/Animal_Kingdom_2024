import { ICanJump } from "../interfaces/ICanJump";
import Animal from "./Animal";
import { AnimalCandidate } from "./Animal";

export default abstract class Mammal extends Animal implements ICanJump {
    jump(): void {
        console.log(`${this.name} is jumping`);
    }


    public giveBirth(): AnimalCandidate[] | void {
        if (super.giveBirth()) {
            this.timesGivenBirth++;
            const candidatesforAnimals: AnimalCandidate[] = [];
            const numberOfMammalBabies = 5;
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
