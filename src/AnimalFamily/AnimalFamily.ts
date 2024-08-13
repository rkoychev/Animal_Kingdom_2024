import { families } from "../app";
import Animal from "../hierarchy/Animal";
import verifyFamilyInfo, {
  VerificationResult,
  VerificationProps,
} from "./verifyFamilyInfo";
export default class AnimalFamily {
  name: string;
  animals: Animal[];
  constructor(name: string, animals: Animal[]) {
    if (animals.length === 0) {
      throw new Error("A family must have at least one Animal");
    }
    if (animals[0].canHaveFamily() === false) {
      throw new Error(`${animals[0].constructor.name} cannot have family`);
    }
    let requirements: VerificationProps = {
      name: name,
      animals: animals,
    };
    const specificRequirements = getSpecificRequirements(
      requirements,
      animals[0]
    );
    const verificationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    if (verificationResult.message === "") {
      this.name = name;
      animals.forEach((animal) => {
        animal.setHome(this.name);
      });
      this.animals = animals;
      families.push(this);
    } else {
      throw new Error(verificationResult.message);
    }
  }
  //return an empty string if it can be added otherwise the reason that it can't be added
  checkCanAddAnimal(animal: Animal): string {
    const animalClass = this.animals[0].constructor.name;
    if (animal.constructor.name !== animalClass) {
      return `Two different types of Animal cannot be in the same family`;
    }
    if (animal.getHome() === this.name) {
      return `${this.name} is already in the family`;
    }
    const familyWithNewMember = [...this.animals, animal];
    let requirements: VerificationProps = {
      animals: familyWithNewMember,
    };
    const specificRequirements = getSpecificRequirements(requirements, animal);
    const verificationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    return verificationResult.message;
  }
  addAnimal(animal: Animal, fromBirth = false): void {
    const verificationResult = this.checkCanAddAnimal(animal);
    if (fromBirth) {
      this.animals.push(animal);
    } else {
      if (verificationResult === "") {
        animal.setHome(this.name);
        this.animals.push(animal);
        console.log(`${animal.getName()} added to ${this.name}`);
      } else {
        console.log(`Cannot add ${animal.getName()} to family`);
        console.log(verificationResult);
      }
    }
  }

  //return an empty string if it can be removed otherwise the reason that it can't be removed
  checkCanRemoveAnimal(animal: Animal): string {
    if (this.animals.indexOf(animal) === -1) {
      return `${animal.getName()} is not part of ${this.name}`;
    }
    const animalsWithoutRemovedAnimal = this.animals.filter(
      (anim) => anim !== animal
    );
    let requirements: VerificationProps = {
      animals: animalsWithoutRemovedAnimal,
    };
    const specificRequirements = getSpecificRequirements(requirements, animal);
    const verificationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    return verificationResult.message;
  }
  removeAnimal(animal: Animal): void {
    const verificationResult = this.checkCanRemoveAnimal(animal);
    if (verificationResult === "") {
      this.animals = this.animals.filter((anim) => anim !== animal);
      console.log(`Removed ${animal.getName()} from ${this.name}`);
      animal.setHome(undefined);
    } else {
      console.log(`Cannot remove ${animal.getName()} from family`);
      console.log(verificationResult);
    }
  }
}

function getSpecificRequirements(
  basicRequirements: VerificationProps,
  animal: Animal
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
  const animalClass = animal.constructor.name;
  switch (animalClass) {
    case "Crocodile":
      specificRequirements = {
        ...CROCODILE_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      };
      break;
    case "Lion":
      specificRequirements = {
        ...LION_FAMILY_REQUIREMENTS,
        ...specificRequirements,
      };
      break;
    default:
      break;
  }

  return specificRequirements;
}
