import { families } from "../app";
import Animal from "../hierarchy/Animal";
export type VerificationResult = {
  message: string;
};
export type VerificationProps = {
  name?: string;
  animals: Animal[];
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
  const animalsClass = validations.animals[0].constructor.name;
  const animalsCount = validations.animals?.length;
  let femalesCount = 0;
  let malesCount = 0;
  let malesAdultsCount = 0;
  let femaleAdultsCount = 0;
  validations.animals?.forEach((animal) => {
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
  const allSameType = !validations.animals.some(
    (animal) => animal.constructor.name !== animalsClass
  );
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
    message += `Family members cannot be more than ${validations.maxAnimals}. \n`;
  }

  if (
    animalsCount &&
    validations.minAnimals &&
    animalsCount < validations.minAnimals
  ) {
    message += `Family members cannot be less than ${validations.minAnimals}. \n`;
  }

  if (
    validations.maxMaleAdults &&
    malesAdultsCount > validations.maxMaleAdults
  ) {
    message += `Male adults in the family cannot be more than ${validations.maxMaleAdults}.\n`;
  }

  if (
    validations.minMaleAdults &&
    malesAdultsCount < validations.minMaleAdults
  ) {
    message += `Male adults in the family cannot be less than ${validations.minMaleAdults}.\n `;
  }

  if (
    validations.maxFemaleAdults &&
    femaleAdultsCount > validations.maxFemaleAdults
  ) {
    message += `Female adults in the family cannot be more than ${validations.maxFemaleAdults}. \n`;
  }

  if (
    validations.minFemaleAdults &&
    femaleAdultsCount < validations.minFemaleAdults
  ) {
    message += `Female adults in the family cannot be less than ${validations.minFemaleAdults}. \n`;
  }

  if (validations.minMales && malesCount < validations.minMales) {
    message += `Males in the family cannot be less than ${validations.minMales}. \n`;
  }

  if (validations.maxMales && malesCount > validations.maxMales) {
    message += `Males in the family cannot be more than ${validations.maxMales}. \n`;
  }

  if (validations.minFemales && femalesCount < validations.minFemales) {
    message += `Females in the family cannot be less than ${validations.minFemales}. \n`;
  }

  if (validations.maxFemales && femalesCount > validations.maxFemales) {
    message += `Females in the family cannot be more than ${validations.maxFemales}. \n`;
  }

  if (
    validations.minOfAnyGender &&
    femalesCount < validations.minOfAnyGender &&
    malesCount < validations.minOfAnyGender
  ) {
    message += `Family members of any gender cannot be less than ${validations.minOfAnyGender}.\n `;
  }

  return {
    message: message.trim(),
  };
}
