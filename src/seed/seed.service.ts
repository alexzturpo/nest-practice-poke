import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfeces/poke-res-interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http : AxiosAdapter ,
  ) {}
  async runSeed() {
    await this.pokemonService.deleteTable();
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });
    console.log(pokemons);

    await this.pokemonService.createMany(pokemons);
    return {mensaje: "Registros insertados", registros: pokemons};;
  }
}
