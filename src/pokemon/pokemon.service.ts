import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.controError(error);
    }
  }
  async createMany(createPokemonDto: CreatePokemonDto[]) {
    try {
      const pokemons = await this.pokemonModel.insertMany(createPokemonDto,{
        ordered: true,
      });
      return {mensaje: "Registros insertados", registros: pokemons};
      
    } catch (error) {
      this.controError(error);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term ${term} not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      let pokemon = await this.findOne(term);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      await pokemon.updateOne(updatePokemonDto);
      let updatePoke = { ...pokemon.toJSON(), ...updatePokemonDto };

      return updatePoke;
    } catch (error) {
      this.controError(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne()
    // return "Pokemon deleted";
    const res = await this.pokemonModel.deleteOne({ _id: id });
    if(res.deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return res;
  }

  controError(error: any) {
    if (error.code === 11000) {
      throw new NotFoundException(
        `Pokemon with ${JSON.stringify(error.keyValue)} already exists`,
      );
    }
    throw error;
  }
}
