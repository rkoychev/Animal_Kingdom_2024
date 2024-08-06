import { ICanJump } from "../interfaces/ICanJump";
import Animal from "./Animal";

export default abstract class Mammal extends Animal implements ICanJump {
    jump(): void {
        console.log(`${this.name} is jumping`);
    }
    
    
    giveBirth(): void{

    };
  }
  