import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { UsePokemonCardDetails } from "./usePokemonCardDetailsType";

export const usePokemonCardDetails = (): UsePokemonCardDetails => {
   const [ability, setAbility] = useState<string>('');
   const [abilityText, setAbilityText] = useState<string>('');
    const getPokemonAbility= async () => {
        if(ability) {
        return await axios.get(`https://pokeapi.co/api/v2/ability/${ability}/`)
        .catch((error) => {throw new Error(error)});
        }
    }

    const {data, isLoading, isRefetching, refetch} = useQuery('pokemon-ability', getPokemonAbility, {enabled: !!ability});

    const getAbilityDetails = (abilityId: string) => {
      setAbility(abilityId)
    }

    useEffect(() => {
      if (ability) {
        refetch();
      }
      setAbility('')
    }, [ability])

    useEffect(() => {
      if(data) {
       const entry = data?.data?.effect_entries?.find
       ((entry: { language: { name: string; }; }) => entry.language.name === 'en');
       if(entry) {
        setAbilityText(entry.effect)
       }
      }
    }, [data])

    return {
    ability: abilityText ?? 'N/A',
    getAbilityDetails,
    isLoading,
    isRefetching
    };
  };