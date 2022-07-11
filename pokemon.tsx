import pokemonJson from "./pokemon.json" assert { type: "json" };
type Pokemon = {
  name: string;
};

export const pokemon = pokemonJson as Pokemon[];
