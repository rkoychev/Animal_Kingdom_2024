import Crocodile from "../animals/Crocodile";
import Lion from "../animals/Lion";
import { families } from "../app";
import { AnimalType } from "../customTypes";
import verifyFamilyInfo, {
  VerificationResult,
  VerificationProps,
} from "./verifyFamilyInfo";
export default class AnimalFamily {
  name: string;
  animals: AnimalType[];
  animalsType: typeof Lion | typeof Crocodile;
  constructor(name: string, animals: AnimalType[]) {
    if (animals.length === 0) {
      throw new Error("A family must have at least one Animal");
    }
    if (animals[0] instanceof Lion) {
      this.animalsType = Lion;
    } else if (animals[0] instanceof Crocodile) {
      this.animalsType = Crocodile;
    } else throw new Error("Only Crocodile and Lions can have a family");

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
  addAnimal(animal: AnimalType, fromBirth = false) {
    if (!(animal instanceof this.animalsType)) {
      throw new Error(
        `Two different types of Animal cannot be in the same family`
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
  removeAnimal(animal: AnimalType) {
    const animalsWithoutRemovedAnimal = this.animals.filter(
      (anim) => anim !== animal
    );

    let requirements: VerificationProps = {
      animals: animalsWithoutRemovedAnimal,
      animalsType: this.animalsType,
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
  animal: AnimalType
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
  if (animal instanceof Crocodile) {
    specificRequirements = {
      ...CROCODILE_FAMILY_REQUIREMENTS,
      ...basicRequirements,
      animalsType: Crocodile,
    };
  } else if (animal instanceof Lion) {
    specificRequirements = {
      ...LION_FAMILY_REQUIREMENTS,
      ...basicRequirements,
      animalsType: Lion,
    };
  }
  return specificRequirements;
}
