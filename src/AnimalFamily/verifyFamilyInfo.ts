import {
  DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY,
  FAMILY_MAX_MALE_ADULTS_EXCEEDED,
  FAMILY_MAX_MEMBERS_EXCEEDED,
  FAMILY_MIN_MALES_NOT_MET,
  FAMILY_MIN_MEMBERS_NOT_MET,
  FAMILY_NAME_TAKEN,
  FAMILY_MAX_FEMALE_ADULTS_EXCEEDED,
  FAMILY_MIN_FEMALE_ADULTS_NOT_MET,
  FAMILY_MAX_MALES_EXCEEDED,
  FAMILY_MIN_FEMALES_NOT_MET,
  FAMILY_MAX_FEMALES_EXCEEDED,
  FAMILY_MIN_ANY_GENDER_NOT_MET,
  ANIMALS_ALREADY_HAVE_FAMILY,
} from '../../messages/errorMessages'
import { families } from '../app'
import Animal from '../hierarchy/Animal'

export type VerificationProps = {
  name?: string
  animals: Animal[]
  minAnimals?: number
  maxAnimals?: number
  minMales?: number
  maxMales?: number
  minFemales?: number
  maxFemales?: number
  minMaleAdults?: number
  maxMaleAdults?: number
  minFemaleAdults?: number
  maxFemaleAdults?: number
  minOfAnyGender?: number // at least one of the two to have this many
}

export default function verifyFamilyInfo(validations: VerificationProps): string[] {
  const errorMessagesArray: string[] = []
  const animalsClass = validations.animals[0].constructor.name
  const animalsCount = validations.animals?.length
  let femalesCount = 0
  let malesCount = 0
  let malesAdultsCount = 0
  let femaleAdultsCount = 0
  validations.animals?.forEach((animal) => {
    if (animal.getIsAdult()) {
      if (animal.getIsMale()) {
        malesAdultsCount += 1
      } else {
        femaleAdultsCount += 1
      }
    }
    if (animal.getIsMale()) {
      malesCount += 1
    } else {
      femalesCount += 1
    }
  })
  const allSameType = !validations.animals.some((animal) => animal.constructor.name !== animalsClass)

  if (!allSameType) {
    errorMessagesArray.push(DIFFERENT_TYPE_ANIMALS_CANNOT_HAVE_FAMILY)
  }

  families.forEach((family) => {
    if (family.name === validations.name) {
      errorMessagesArray.push(FAMILY_NAME_TAKEN)
    }
  })

  if (animalsCount && validations.maxAnimals && animalsCount > validations.maxAnimals) {
    errorMessagesArray.push(FAMILY_MAX_MEMBERS_EXCEEDED + validations.maxAnimals)
  }

  if (animalsCount && validations.minAnimals && animalsCount < validations.minAnimals) {
    errorMessagesArray.push(FAMILY_MIN_MEMBERS_NOT_MET + validations.minAnimals)
  }

  if (validations.maxMaleAdults && malesAdultsCount > validations.maxMaleAdults) {
    errorMessagesArray.push(FAMILY_MAX_MALE_ADULTS_EXCEEDED + validations.maxMaleAdults)
  }

  if (validations.minMaleAdults && malesAdultsCount < validations.minMaleAdults) {
    errorMessagesArray.push(FAMILY_MIN_MALES_NOT_MET + validations.minMaleAdults)
  }

  if (validations.maxFemaleAdults && femaleAdultsCount > validations.maxFemaleAdults) {
    errorMessagesArray.push(FAMILY_MAX_FEMALE_ADULTS_EXCEEDED + validations.maxFemaleAdults)
  }

  if (validations.minFemaleAdults && femaleAdultsCount < validations.minFemaleAdults) {
    errorMessagesArray.push(FAMILY_MIN_FEMALE_ADULTS_NOT_MET + validations.minFemaleAdults)
  }

  if (validations.minMales && malesCount < validations.minMales) {
    errorMessagesArray.push(FAMILY_MIN_MALES_NOT_MET + validations.minMales)
  }

  if (validations.maxMales && malesCount > validations.maxMales) {
    errorMessagesArray.push(FAMILY_MAX_MALES_EXCEEDED + validations.maxMales)
  }

  if (validations.minFemales && femalesCount < validations.minFemales) {
    errorMessagesArray.push(FAMILY_MIN_FEMALES_NOT_MET + validations.minFemales)
  }

  if (validations.maxFemales && femalesCount > validations.maxFemales) {
    errorMessagesArray.push(FAMILY_MAX_FEMALES_EXCEEDED + validations.maxFemales)
  }

  if (
    validations.minOfAnyGender &&
    femalesCount < validations.minOfAnyGender &&
    malesCount < validations.minOfAnyGender
  ) {
    errorMessagesArray.push(FAMILY_MIN_ANY_GENDER_NOT_MET + validations.minOfAnyGender)
  }

  return errorMessagesArray
}
