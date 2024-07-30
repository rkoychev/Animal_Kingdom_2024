import Crocodile from "./specificAnimalClasses/CrocodileClass";
import Lion from "./specificAnimalClasses/LionClass";
import Snake from "./specificAnimalClasses/SnakeClass";
import Squirrel from "./specificAnimalClasses/SquirrelClass";
import Tortoise from "./specificAnimalClasses/TortoiseClass";

export type Gender = "Male" | "Female";
export type AgeBracket = "Adult" | "Child";
export type TreeType = "Poplar" | "Cedar" | "Oak" | "Maple";
export type SnakeType = "Cobra" | "Python" | "Anaconda";
export type MammalAnimalType = "Lion" | "Squirrel";
export type ReptileAnimalType = "Crocodile" | "Tortoise" | SnakeType;
export type Animal = Lion | Snake | Crocodile | Tortoise | Squirrel;
export type Group = "Mammal" | "Reptile";
