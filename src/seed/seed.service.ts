import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfeces/poke-res-interface';
// import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  // constructor(
  //   private readonly pokemonService: PokemonService, // Assuming you have a PokemonService to handle database operations
  // ) {}
  async runSeed() {
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=5');
    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });
    console.log(pokemons);

    // await this.pokemonService.createMany(pokemons);
    return pokemons;
  }
}
