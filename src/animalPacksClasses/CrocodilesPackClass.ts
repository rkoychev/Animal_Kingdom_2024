import { crocodilePacks } from "../constVariables";
import Crocodile from "../specificAnimalClasses/CrocodileClass";
import verifyCrocodilePack, {
  verifyAddCrocodile,
  verifyPackName,
} from "../verificationFunction/crocodileVerifications";
import { checkNameNotEmpty } from "../verificationFunction/inputCheck";
export default class CrocodilesPack {
  name: string;
  crocodiles: Crocodile[] = [];
  constructor(name: string, crocodiles: Crocodile[]) {
    checkNameNotEmpty(name);
    verifyPackName(name);
    verifyCrocodilePack(crocodiles);
    this.name = name;
    this.crocodiles.push(
      ...crocodiles.map((crocodile) => {
        crocodile.setHome(this.name);
        return crocodile;
      })
    );
    crocodilePacks.push(this);
  }
  addCrocodile(crocodile: Crocodile): void {
    {
      if (crocodile.getHome() !== undefined) {
        console.log(
          `${crocodile.getHome()} already belongs to another pack ${crocodile.getHome()}`
        );
        return;
      }
      if (verifyAddCrocodile(this.crocodiles)) {
        crocodile.setHome(this.name);
        this.crocodiles.push(crocodile);
        console.log(`Added ${crocodile.getName()} to ${this.name}`);
      }
    }
  }
  removeCrocodile(crocodile: Crocodile): void {
    crocodile.setHome(undefined);
    this.crocodiles = this.crocodiles.filter((croco) => crocodile !== croco);
    console.log(`${crocodile.getName()} has left ${this.name}`);
  }

  addCrocodileFromBirth(crocodile: Crocodile): void {
    crocodile.setHome(this.name);
    this.crocodiles.push(crocodile);
  }
}
