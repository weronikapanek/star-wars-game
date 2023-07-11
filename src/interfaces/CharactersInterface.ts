import {CharacterInterface} from "./CharacterInterface";

export interface CharactersInterface {
  count: number;
  next: string;
  previous: string | null;
  results: Array<CharacterInterface>;
}
