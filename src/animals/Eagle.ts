 import { AnimalCandidate } from "../hierarchy/Animal"
import Birds from "../hierarchy/Birds"
import Reptile from "../hierarchy/Reptile"
import { ICanFly } from "../interfaces/ICanFly"
import { ICanTalk } from "../interfaces/ICanTalk"
const EAGLE_SPACE_NEEDED_AS_ADULT = 100
const EAGLE_SPACE_NEEDED_AS_CHILD = 50
const NUMBER_OF_BABY_EAGLES_BORN = 4
const AGE_TO_BE_ADULT = 1;
export default class Eagle extends Birds implements ICanTalk, ICanFly {
    private numberOfBabiesBorn = NUMBER_OF_BABY_EAGLES_BORN
    protected home?: string | undefined
    constructor(name: string, age: number, isMale: boolean) {
        super(name, age, isMale)
        this.isAdult = this.setMaturity(this.age,AGE_TO_BE_ADULT)
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
            babies.push(babyEagle)
        })
        return babies
    }
}