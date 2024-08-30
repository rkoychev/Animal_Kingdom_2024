import AnimalShelter from "../animalShelter/AnimalShelter"
import { AnimalCandidate } from "../hierarchy/Animal"
import Birds from "../hierarchy/Birds"
import Reptile from "../hierarchy/Reptile"
import { ICanFly } from "../interfaces/ICanFly"
import { ICanTalk } from "../interfaces/ICanTalk"
export const EAGLE_SPACE_NEEDED_AS_ADULT = 100
export const EAGLE_SPACE_NEEDED_AS_CHILD = 50
export const NUMBER_OF_BABY_EAGLES_BORN = 4
export const AGE_TO_BE_ADULT = 1;
export default class Eagle extends Birds implements ICanTalk, ICanFly {
    private numberOfBabiesBorn = NUMBER_OF_BABY_EAGLES_BORN
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
            return EAGLE_SPACE_NEEDED_AS_ADULT
        } else {
            return EAGLE_SPACE_NEEDED_AS_CHILD
        }
    }
    public giveBirth(): Eagle[] {
        const candidateEagles: AnimalCandidate[] = this.generateBabyProperties(this.numberOfBabiesBorn)
        const babies: Eagle[] = []
        candidateEagles?.forEach((eagleObjectInfo) => {
            const babyEagle = new Eagle(eagleObjectInfo.name, 0, eagleObjectInfo.isMale)
            babyEagle.home = this.home
            AnimalShelter.getInstance().addAnimal(babyEagle, true)
            babies.push(babyEagle)
        })
        return babies
    }
}