import { ICanFly } from "../interfaces/ICanFly"
import { ICanTalk } from "../interfaces/ICanTalk"
import Animal, { AnimalCandidate } from "./Animal"

export default abstract class Birds extends Animal implements ICanFly, ICanTalk {
    fly(): string {
        return `${this.name} is flying`
    }
    talk(): string {
        return `${this.name} is talking`
    }

    protected generateBabyProperties(numberOfChildren: number): AnimalCandidate[] {
        const candidatesforAnimals: AnimalCandidate[] = []
        if (this.canGiveBirth()) {
            this.timesGivenBirth++
            for (let i = 1; i <= numberOfChildren; i++) {
                const name: string = this.name + '-Baby-' + this.timesGivenBirth + '-' + i
                const isMale: boolean = Math.random() % 2 == 0 ? false : true
                candidatesforAnimals.push({ name: name, isMale: isMale })
            }
        }
        return candidatesforAnimals
    }

}