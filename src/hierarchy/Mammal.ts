import { NEGATIVE_VALUES } from "../../messages/errorMessages";
import { ICanJump } from "../interfaces/ICanJump";
import Animal from "./Animal";
import { AnimalCandidate } from "./Animal";

export default abstract class Mammal extends Animal {
    generateRandomHeight(lowBound: number, highBound: number) {
        if (lowBound < 0 || highBound < 0) {
            throw new Error(NEGATIVE_VALUES);
        }
        return Math.round((Math.random() * (highBound - lowBound) + lowBound) * 100) / 100;
    }

    generateRandomWeight(lowBound: number, highBound: number) {
        if (lowBound < 0 || highBound < 0) {
            throw new Error(NEGATIVE_VALUES);
        }
        return Math.round((Math.random() * (highBound - lowBound) + lowBound));
    }

    protected generateBabyProperties(numberOfChildren: number): AnimalCandidate[] {
        const candidatesforAnimals: AnimalCandidate[] = [];
        if (this.canGiveBirth()) {
            this.timesGivenBirth++;
            const numberOfMammalBabies = numberOfChildren;
            for (let i = 1; i <= numberOfMammalBabies; i++) {
                const name: string =
                    this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
                const isMale: boolean = Math.random() % 2 == 0 ? false : true;
                candidatesforAnimals.push({ name: name, isMale: isMale });
            }

        };
        return candidatesforAnimals;
    };
}
