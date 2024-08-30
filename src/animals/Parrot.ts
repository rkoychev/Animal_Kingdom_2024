import AnimalShelter from "../animalShelter/AnimalShelter"
import { AnimalCandidate } from "../hierarchy/Animal"
import Birds from "../hierarchy/Birds"
import Reptile from "../hierarchy/Reptile"
import { ICanFly } from "../interfaces/ICanFly"
import { ICanTalk } from "../interfaces/ICanTalk"
export const PARROT_SPACE_NEEDED_AS_ADULT = 40
export const PARROT_SPACE_NEEDED_AS_CHILD = 20
export const NUMBER_OF_BABY_PARROT_BORN = 2
export const AGE_TO_BE_ADULT = 1;
export default class Parrot extends Birds implements ICanTalk, ICanFly {
    private numberOfBabiesBorn = NUMBER_OF_BABY_PARROT_BORN
    protected home?: string | undefined
    constructor(name: string, age: number, isMale: boolean) {
        super(name, age, isMale)
        this.isAdult = this.setMaturity(AGE_TO_BE_ADULT)
        AnimalShelter.getInstance().addAnimal(this) // what happens if limits exceeded
        this.setHome('Animal Shelter')
    }
    public talk(): string {
        return `${this.name} is talking`
    }
    public fly(): string {
        return `${this.name} is flying`
    }
    public getSpaceNeeded(): number {
        if (this.isAdult === true) {
            return PARROT_SPACE_NEEDED_AS_ADULT
        } else {
            return PARROT_SPACE_NEEDED_AS_CHILD
        }
    }
    public giveBirth(): Parrot[] {
        const candidateParrots: AnimalCandidate[] = this.generateBabyProperties(this.numberOfBabiesBorn)
        const babies: Parrot[] = []
        candidateParrots?.forEach((parrotObjectInfo) => {
            const babyParrot = new Parrot(parrotObjectInfo.name, 0, parrotObjectInfo.isMale)
            babyParrot.home = this.home
            AnimalShelter.getInstance().addAnimal(babyParrot, true)
            babies.push(babyParrot)
        })
        return babies
    }
}