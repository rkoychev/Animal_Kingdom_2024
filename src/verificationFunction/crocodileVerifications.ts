import { crocodilePackSizeLimit } from "../constVariables";
import Crocodile from "../specificAnimalClasses/CrocodileClass";
import { crocodilePacks } from "../constVariables";
export default function verifyCrocodilePack(crocodiles: Crocodile[]): void {
  //the pack must have at least 2 males or females
  if (crocodiles.length > crocodilePackSizeLimit) {
    throw new Error(
      `Crocodile pack can have a maximum of ${crocodiles.length} crocodiles`
    );
  } else {
    let femalesNum = 0;
    let malesNum = 0;
    crocodiles.forEach((crocodile) => {
      if(crocodile.getHome()!==undefined){
        throw new Error(`${crocodile.getName()} already belongs to another pack ${crocodile.getHome()}`);
      }
      if (crocodile.getGender() === "Female") {
        femalesNum++;
      } else {
        malesNum++;
      }
    });
    if (femalesNum < 2 && malesNum < 2) {
      throw new Error(`Crocodile pack must have at least 2 males or females`);
    }
  }
}
export function verifyAddCrocodile(crocodiles: Crocodile[]): boolean {
  if (crocodiles.length >= crocodilePackSizeLimit) {
    console.log(`Sorry the pack is full cant add a crocodile to the pack :(`);
    return false;
  }
  return true;
}
export function verifyPackName(name: string): void {
  crocodilePacks.forEach((pack) => {
    if (pack.name === name) {
      throw new Error(`Pack ${name} already exists`);
    }
  });
}
