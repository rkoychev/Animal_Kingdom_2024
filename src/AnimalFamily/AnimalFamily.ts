import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
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
    let requirements: VerificationProps = {
      name: name,
      animals: animals,
    };
    const specificRequirements = getSpecificRequirements(
      requirements,
      animals[0]
    );
    const verifycationResult: VerificationResult =
      verifyFamilyInfo(specificRequirements);
    if (verifycationResult.isValid) {
      this.name = name;
      animals.forEach((animal) => {
        animal.setHome(this.name);
      });
      this.animals = animals;
      families.push(this);
    } else {
      throw new Error(verifycationResult.message);
    }
  }
  addAnimal(animal: Animal, fromBirth = false) {
    const animalInstance = checkInstance(this.animals[0]);
    if (!(animal instanceof animalInstance))
      throw new Error(
        `Two different types of Animal cannot be in the same family`
      );
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
          animalsType: animalInstance,
        };
        const specificRequirements = getSpecificRequirements(
          requirements,
          animal
        );
        const verifycationResult: VerificationResult =
          verifyFamilyInfo(specificRequirements);
        if (verifycationResult.isValid) {
          animal.setHome(this.name);
          this.animals.push(animal);
        } else {
          console.log(`Cannot add ${animal.getName()} to family`);
          console.log(verifycationResult.message);
        }
      }
    }
  }
  removeAnimal(animal: Animal) {
    if (!this.animals.includes(animal)) {
      console.log(`${animal.getName()} is not part of ${this.name}`);
      return;
    }
    const animalsWithoutRemovedAnimal = this.animals.filter(
      (anim) => anim !== animal
    );
    let requirements: VerificationProps = {
      animals: animalsWithoutRemovedAnimal,
    };
    const specificRequirements = getSpecificRequirements(requirements, animal);
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
  const animalInstance = checkInstance(animal);
  switch (animalInstance) {
    case Crocodile:
      specificRequirements = {
        ...CROCODILE_FAMILY_REQUIREMENTS,
        ...specificRequirements,
        animalsType: Crocodile,
      };
      break;
    case Lion:
      specificRequirements = {
        ...LION_FAMILY_REQUIREMENTS,
        ...specificRequirements,
        animalsType: Lion,
      };
      break;
    default:
      break;
  }

  return specificRequirements;
}
function checkInstance(animal: Animal): typeof Crocodile | typeof Lion {
  if (animal instanceof Crocodile) {
    return Crocodile;
  } else if (animal instanceof Lion) {
    return Lion;
  } else {
    throw new Error(`${animal.constructor.name}s don't live in families`);
  }
}
