import AnimalShelter from "../animalShelter/AnimalShelter"
import { AnimalCandidate } from "../hierarchy/Animal"
import Birds from "../hierarchy/Birds"
import Reptile from "../hierarchy/Reptile"
import { ICanFly } from "../interfaces/ICanFly"
import { ICanTalk } from "../interfaces/ICanTalk"
const PARROT_SPACE_NEEDED_AS_ADULT = 40
const PARROT_SPACE_NEEDED_AS_CHILD = 20
const NUMBER_OF_BABY_PARROT_BORN = 2
const AGE_TO_BE_ADULT = 1;
export default class Parrot extends Birds implements ICanTalk, ICanFly {
    private numberOfBabiesBorn = NUMBER_OF_BABY_PARROT_BORN
    protected home?: string | undefined
    constructor(name: string, age: number, isMale: boolean) {
        super(name, age, isMale)
        this.isAdult = this.setMaturity(this.age, AGE_TO_BE_ADULT)
        AnimalShelter.getInstance().addAnimal(this, false) // what happens if limits exceeded
        this.setHome('Animal Shelter')
    }
    talk(): string {
        return `${this.name} is talking`
    }
    fly(): string {
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