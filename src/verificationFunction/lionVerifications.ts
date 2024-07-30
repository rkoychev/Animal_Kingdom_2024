import Lion from "../specificAnimalClasses/LionClass";
import {
  lionFamilies,
  lionFamilyLimit,
  lionsFamilyMinimum,
} from "../constVariables";
export default function verifyLionFamily(lions: Lion[]): void {
  if (lions.length > lionFamilyLimit) {
    throw new Error(
      `A lion family cant have more than ${lionFamilyLimit} members`
    );
  } else if (lions.length < lionsFamilyMinimum) {
    throw new Error(
      `A lion family must have at least ${lionsFamilyMinimum} members`
    );
  } else {
    let hasMaxOneMaleAdult = true;
    let maleAdultCnt = 0;
    lions.forEach((lion) => {
      if (lion.getGender() === "Male" && lion.getAgeBracket() === "Adult") {
        maleAdultCnt++;
        if (maleAdultCnt > 1) {
          hasMaxOneMaleAdult = false;
        }
      }
    });
    if (!hasMaxOneMaleAdult) {
      throw new Error(`Cannot have more than one male Adult lion in a family`);
    }
  }
}
export function verifyAddingLion(lions: Lion[], lion: Lion): boolean {
  if (lions.length >= lionFamilyLimit) {
    console.log(
      `Sorry the pack is full can't add ${lion.getName()} to the family :(`
    );
    return false;
  } else if (lion.getGender() === "Male" && lion.getAgeBracket() === "Adult") {
    let hasAdultMale = false;
    lions.forEach((lion) => {
      if (lion.getGender() === "Male" && lion.getAgeBracket() === "Adult") {
        hasAdultMale = true;
      }
    });
    if (hasAdultMale) {
      console.log("Sorry can't add another adult Male lion into the family");
      return false;
    }
  }
  return true;
}
export function verifyFamilyName(name: string): void {
  lionFamilies.forEach((family) => {
    if (family.name === name) {
      throw new Error(`Family ${name} already exists`);
    }
  });
}
