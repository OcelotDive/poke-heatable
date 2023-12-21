import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { pagingOptions, Paging } from "@/app/constants/paging";
import { UsePokemonRequest } from "./usePokemonRequestType";

export const usePokemonRequest = (): UsePokemonRequest => {
    const [options, setOptions] = useState<Paging | null>(pagingOptions);
    const [pokemonList, setPokemonList] = useState<unknown[]>([]);

    const getPokemonList = async () => {
      if (!options?.query) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${options.skip}&limit=${options.take}`)
        .catch((error) => {throw new Error(error)});
      } else if (options?.query) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${options.query}/`)
        .catch(() => {
          setPokemonList([])
        });
      }
    }

    const getEachPokemon = async (item: { url: string; image: any; }) => {
         await axios.get(item?.url).then(response => {
          setPokemonList((prevList) => [...prevList, response?.data]);
         }).catch((error) => {throw new Error(error)})     
    }

    const {data, isLoading, isRefetching, refetch} = useQuery('pokemon-list', getPokemonList);

    const getList = (options: Paging) => {
      setOptions(options);
    }

    useEffect(() => {
        if (data?.data?.results) {
          setPokemonList([])
         const dataSet =  data?.data?.results?.map((element: { url: string; image: any; }) => {
               getEachPokemon(element)
            });
        } else {
          setPokemonList([data?.data])
        }
    }, [data])

    useEffect(() => {
      refetch();
    }, [options])

    return {
      pokemonList: pokemonList[0] !== undefined ? pokemonList : [],
      getList,
      count: data?.data?.count ? data?.data?.count : 0,
      isLoading,
      isRefetching,
    };
  };