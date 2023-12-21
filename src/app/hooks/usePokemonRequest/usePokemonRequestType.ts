import { Paging } from "@/app/constants/paging"

export type UsePokemonRequest = {
    pokemonList: any[];
      getList: (options: Paging) => void;
      count: number;
      isLoading: boolean;
      isRefetching: boolean;
}