import { createSlice } from '@reduxjs/toolkit'
import { IAsignatura } from '../../../app/Models/Iasignatura';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    page: 0,
    pokemons: Array<IAsignatura>(),
    isLoading: false,
  },
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true;
    },
    setPokemons: (state, action) => {
      console.log(action);
    //   state.isLoading = true;
    //   state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions

// export default pokemonSlice.reducer