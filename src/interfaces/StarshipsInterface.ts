import {StarshipInterface} from "./StarshipInterface";

export interface StarshipsInterface {
  count: number;
  next: string;
  previous: string | null;
  results: Array<StarshipInterface>;
}
