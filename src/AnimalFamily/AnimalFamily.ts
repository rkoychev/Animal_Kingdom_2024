import {
  ANIMALS_ALREADY_HAVE_FAMILY,
  ANIMAL_ALREADY_IN_FAMILY,
  ANIMAL_CANNOT_HAVE_FAMILY_ERROR_MESSAGE,
  ANIMAL_NOT_PART_OF_FAMILY,
  DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY,
  EMPTY_FAMILY_ERROR_MESSAGE,
} from '../../messages/errorMessages'
import { families } from '../app'
import Animal from '../hierarchy/Animal'
import verifyFamilyInfo, { VerificationProps } from './verifyFamilyInfo'
export default class AnimalFamily {
  name: string
  animals: Animal[]
  constructor(name: string, animals: Animal[]) {
    if (animals.length === 0) {
      throw new Error(EMPTY_FAMILY_ERROR_MESSAGE)
    }
    if (animals[0].canHaveFamily() === false) {
      throw new Error(ANIMAL_CANNOT_HAVE_FAMILY_ERROR_MESSAGE)
    }
    const animalsAlreadyHaveFamily = animals.filter((animal) => animal.getHome() !== undefined).length !== 0
    if (animalsAlreadyHaveFamily) {
      throw new Error(ANIMALS_ALREADY_HAVE_FAMILY)
    }
    let requirements: VerificationProps = {
      name: name,
      animals: animals,
    }
    const specificRequirements = getSpecificRequirements(requirements, animals[0])
    const verificationResult: string[] = verifyFamilyInfo(specificRequirements)
    if (verificationResult.length === 0) {
      this.name = name
      animals.forEach((animal) => {
        animal.setHome(this.name)
      })
      this.animals = animals
      families.push(this)
    } else {
      throw new Error(verificationResult.join('\n'))
    }
  }
  //return an empty string if it can be added otherwise the reason that it can't be added
  public checkCanAddAnimal(animal: Animal): string[] {
    const animalClass = this.animals[0].constructor.name
    if (animal.constructor.name !== animalClass) {
      return [DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY]
    }
    if (animal.getHome() === this.name) {
      return [ANIMAL_ALREADY_IN_FAMILY]
    }
    const familyWithNewMember = [...this.animals, animal]
    let requirements: VerificationProps = {
      animals: familyWithNewMember,
    }
    const specificRequirements = getSpecificRequirements(requirements, animal)
    const verificationResult: string[] = verifyFamilyInfo(specificRequirements)
    return verificationResult
  }
  public addAnimal(animal: Animal, fromBirth = false): boolean {
    if (fromBirth) {
      this.animals.push(animal)
      return true
    } else {
      const verificationResult = this.checkCanAddAnimal(animal)
      if (verificationResult.length === 0) {
        if (animal.getHome() !== undefined) {
          return false
        }
        animal.setHome(this.name)
        this.animals.push(animal)
        return true
      }
      return false
    }
  }

  //return an empty string if it can be removed otherwise the reason that it can't be removed
  public checkCanRemoveAnimal(animal: Animal): string[] {
    if (this.animals.indexOf(animal) === -1) {
      return [ANIMAL_NOT_PART_OF_FAMILY]
    }
    const animalsWithoutRemovedAnimal = this.animals.filter((anim) => anim !== animal)
    let requirements: VerificationProps = {
      animals: animalsWithoutRemovedAnimal,
    }
    const specificRequirements = getSpecificRequirements(requirements, animal)
    const verificationResult: string[] = verifyFamilyInfo(specificRequirements)
    return verificationResult
  }
  public removeAnimal(animal: Animal): boolean {
    const verificationResult = this.checkCanRemoveAnimal(animal)
    if (verificationResult.length === 0) {
      this.animals = this.animals.filter((anim) => anim !== animal)
      animal.setHome(undefined)
      return true
    }
    return false
  }
}

function getSpecificRequirements(basicRequirements: VerificationProps, animal: Animal): VerificationProps {
  let specificRequirements = basicRequirements
  const CROCODILE_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    maxAnimals: 25,
    minOfAnyGender: 2,
  }
  const LION_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    maxAnimals: 10,
    minAnimals: 8,
    maxMaleAdults: 1,
  }
  const ELEPHANT_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    minMaleAdults: 2,
    minFemaleAdults: 2,
  }
  const GIRAFFE_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    minAnimals: 10,
    maxAnimals: 20,
  }
  const animalClass = animal.constructor.name
  switch (animalClass) {
    case 'Crocodile':
      specificRequirements = {
        ...CROCODILE_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      }
      break
    case 'Lion':
      specificRequirements = {
        ...LION_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      }
      break
    case 'Elephant':
      specificRequirements = {
        ...ELEPHANT_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      }
      break
    case 'Giraffe':
      specificRequirements = {
        ...GIRAFFE_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      }
      break
    default:
      break
  }

  return specificRequirements
}
