import { AnimalType } from "../customTypes";
import { families } from "../app";
import Lion from "../animals/Lion";
import Crocodile from "../animals/Crocodile";
export type VerificationResult = {
  isValid: boolean;
  message: string;
};
export type VerificationProps = {
  name?: string;
  animals: AnimalType[];
  animalsType?: typeof Lion | typeof Crocodile;
  minAnimals?: number;
  maxAnimals?: number;
  minMales?: number;
  maxMales?: number;
  minFemales?: number;
  maxFemales?: number;
  minMaleAdults?: number;
  maxMaleAdults?: number;
  minFemaleAdults?: number;
  maxFemaleAdults?: number;
  minOfAnyGender?: number; //at least one of the two to have this menny
};

export default function verifyFamilyInfo(
  validations: VerificationProps
): VerificationResult {
  let isValid = true;
  let message = "";
  const animalsCount = validations.animals?.length;
  let femalesCount = 0;
  let malesCount = 0;
  let malesAdultsCount = 0;
  let femaleAdultsCount = 0;
  let allSameType = true;
  validations.animals?.forEach((animal) => {
    if (
      validations.animalsType &&
      !(animal instanceof validations.animalsType)
    ) {
      allSameType = false;
    }
    if (animal.getIsAdult()) {
      if (animal.getIsMale()) {
        malesAdultsCount += 1;
      } else {
        femaleAdultsCount += 1;
      }
    }
    if (animal.getIsMale()) {
      malesCount += 1;
    } else {
      femalesCount += 1;
    }
  });
  if (!allSameType) {
    isValid = false;
    message += `Cannot have different animal types in the same family. \n`;
  }
  families.forEach((family) => {
    if (family.name === validations.name) {
      isValid = false;
      message += `Family name is already taken.\n `;
    }
  });

  if (
    animalsCount &&
    validations.maxAnimals &&
    animalsCount > validations.maxAnimals
  ) {
    isValid = false;
    message += `Family members cannot be more than ${validations.maxAnimals}. \n`;
  }

  if (
    animalsCount &&
    validations.minAnimals &&
    animalsCount < validations.minAnimals
  ) {
    isValid = false;
    message += `Family members cannot be less than ${validations.minAnimals}. \n`;
  }

  if (
    validations.maxMaleAdults &&
    malesAdultsCount > validations.maxMaleAdults
  ) {
    isValid = false;
    message += `Male adults in the family cannot be more than ${validations.maxMaleAdults}.\n`;
  }

  if (
    validations.minMaleAdults &&
    malesAdultsCount < validations.minMaleAdults
  ) {
    isValid = false;
    message += `Male adults in the family cannot be less than ${validations.minMaleAdults}.\n `;
  }

  if (
    validations.maxFemaleAdults &&
    femaleAdultsCount > validations.maxFemaleAdults
  ) {
    isValid = false;
    message += `Female adults in the family cannot be more than ${validations.maxFemaleAdults}. \n`;
  }

  if (
    validations.minFemaleAdults &&
    femaleAdultsCount < validations.minFemaleAdults
  ) {
    isValid = false;
    message += `Female adults in the family cannot be less than ${validations.minFemaleAdults}. \n`;
  }

  if (validations.minMales && malesCount < validations.minMales) {
    isValid = false;
    message += `Males in the family cannot be less than ${validations.minMales}. \n`;
  }

  if (validations.maxMales && malesCount > validations.maxMales) {
    isValid = false;
    message += `Males in the family cannot be more than ${validations.maxMales}. \n`;
  }

  if (validations.minFemales && femalesCount < validations.minFemales) {
    isValid = false;
    message += `Females in the family cannot be less than ${validations.minFemales}. \n`;
  }

  if (validations.maxFemales && femalesCount > validations.maxFemales) {
    isValid = false;
    message += `Females in the family cannot be more than ${validations.maxFemales}. \n`;
  }

  if (
    validations.minOfAnyGender &&
    femalesCount < validations.minOfAnyGender &&
    malesCount < validations.minOfAnyGender
  ) {
    isValid = false;
    message += `Family members of any gender cannot be less than ${validations.minOfAnyGender}.\n `;
  }

  return {
    isValid: isValid,
    message: message.trim(),
  };
}
