import { families } from "../app";
import {
  AnimalType,
  MammalAnimalType,
  ReptileAnimalType,
} from "../customTypes";
import verifyFamilyInfo, {
  VerificationResult,
  VerificationProps,
} from "./verifyFamilyInfo";
export default class AnimalFamily {
  name: string;
  animals: AnimalType[];
  animalsType: MammalAnimalType | ReptileAnimalType;
  constructor(name: string, animals: AnimalType[]) {
    if (animals.length === 0) {
      throw new Error("A family must have at least one Animal");
    }

    let requirements: VerificationProps = {
      name: name,
      animals: animals,
    };
    const animalType = animals[0].getType();
    const specificRequirements = getSpecificRequirements(
      requirements,
      animalType
    );
    const verifycationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    if (verifycationResult.isValid) {
      this.name = name;
      animals.forEach((animal) => {
        animal.setHome(this.name);
      });
      this.animals = animals;
      this.animalsType = animalType;
      families.push(this);
    } else {
      throw new Error(verifycationResult.message);
    }
  }
  addAnimal(animal: AnimalType, fromBirth = false) {
    const animalType = animal.getType();
    if (this.animalsType !== animalType) {
      throw new Error(
        `Animal type ${animalType} cannot be in the same family as ${this.animalsType}`
      );
    }
    if (animal.getHome() === this.name) {
      console.log(`${this.name} is already in the family`);
    } else {
      const familyWithNewMember = [...this.animals, animal];
      //if from birth we skip the verifications
      if (fromBirth) {
        this.animals.push(animal);
      } else {
        let requirements: VerificationProps = {
          animals: familyWithNewMember,
          animalsType: this.animalsType,
        };
        const specificRequirements = getSpecificRequirements(
          requirements,
          this.animalsType
        );
        const verifycationResult: VerificationResult =
          verifyFamilyInfo(specificRequirements);
        if (verifycationResult.isValid) {
          animal.setHome(this.name);
          this.animals.push(animal);
        } else {
          console.log(`Cannot add ${animalType}`);
          console.log(verifycationResult.message);
        }
      }
    }
  }
  removeAnimal(animal: AnimalType) {
    const animalsWithoutRemovedAnimal = this.animals.filter(
      (anim) => anim !== animal
    );

    let requirements: VerificationProps = {
      animals: animalsWithoutRemovedAnimal,
      animalsType: this.animalsType,
    };
    const specificRequirements = getSpecificRequirements(
      requirements,
      this.animalsType
    );
    const verifycationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    //if verification is successful
    if (verifycationResult.isValid) {
      this.animals = animalsWithoutRemovedAnimal;
      console.log(`removed ${animal.getName()} from ${this.name}`);
      animal.setHome(undefined);
    } else {
      console.log(`Cannot remove ${animal.getName()} from family`);
      console.log(verifycationResult.message);
    }
  }
}
function getSpecificRequirements(
  basicRequirements: VerificationProps,
  specificAnimalType: MammalAnimalType | ReptileAnimalType
): VerificationProps {
  let specificRequirements = basicRequirements;
  const CROCODILE_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    maxAnimals: 25,
    minOfAnyGender: 2,
  };
  const LION_FAMILY_REQUIREMENTS: VerificationProps = {
    animals: [],
    maxAnimals: 10,
    minAnimals: 8,
    maxMaleAdults: 1,
  };
  if (specificAnimalType === "Crocodile") {
    specificRequirements = {
      ...CROCODILE_FAMILY_REQUIREMENTS,
      ...basicRequirements,
      animalsType: specificAnimalType,
    };
  } else if (specificAnimalType === "Lion") {
    specificRequirements = {
      ...LION_FAMILY_REQUIREMENTS,
      ...basicRequirements,
      animalsType: specificAnimalType,
    };
  }
  return specificRequirements;
}
