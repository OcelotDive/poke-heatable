

export type UsePokemonCardDetails = {
    ability: string;
    getAbilityDetails: (abilityId: string) => void;
    isLoading: boolean;
    isRefetching: boolean;
}