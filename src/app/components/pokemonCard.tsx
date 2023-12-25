// @ts-nocheck
import React, { useEffect } from 'react';
import { usePokemonCardDetails } from '../hooks/usePokemonCardDetails/usePokemonCardDetails';
import { Box } from '@radix-ui/themes';
import { Spinner } from './spinner';
import {
  convertHeight,
  convertWeight,
} from '../../helperFunctions/heightWeight';
import { truncate } from '../../helperFunctions/strings';
import { Context } from '../../context';
import { useContext } from 'react';
import { THEME } from '../constants/paging';

type Props = {
  selectedPokemon: any;
  handleCloseCard: () => void;
};

export const PokemonCard: React.FC<Props> = ({
  selectedPokemon,
  handleCloseCard,
}) => {
  const { appearance } = useContext(Context);
  const { getAbilityDetails, ability, isLoading, isRefetching } =
    usePokemonCardDetails();
  useEffect(() => {
    if (selectedPokemon) {
      getAbilityDetails(selectedPokemon?.abilities[0]?.ability?.name);
    }
  }, [selectedPokemon]);
  return (
    <Box
      className="mx-auto bg-white rounded-3xl shadow-xl z-50 cursor-pointer absolute fade-in-tableBody absolute"
      onClick={handleCloseCard}
      style={{
        pointerEvents: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '23.75rem',
      }}
    >
      <Box className="grid rounded-3xl max-w-sm shadow-sm bg-gradient-to-br from-orange-500 to-amber-400 border-8 border-yellow-500 flex-col">
        <Box className="pt-2 font-semibold text-2xl flex justify-between capitalize pl-2 pr-2">
          <img
            src={selectedPokemon?.sprites?.front_default}
            className="h-12 w-12  flex-none rounded-full bg-gray-200"
            alt=""
          />
          {selectedPokemon.name}
          <span>
            <small>HP</small>
            {selectedPokemon?.stats[0]?.base_stat ?? 'N/A'}
          </span>
        </Box>
        <Box className="absolute flex h-18 text-xs flex-col capitalize font-bold right-3 top-16 z-50">
          {selectedPokemon.stats.slice(1, 5).map((stat: any, index: any) => (
            <Box className="flex" key={`${stat?.stat?.name_}${index}`}>
              <span>{stat.stat?.name}</span> - <span>{stat.base_stat}</span>
            </Box>
          ))}
        </Box>
        <Box style={{ scale: '90%' }}>
          <img
            src={
              selectedPokemon?.sprites?.other['official-artwork']?.front_default
            }
            width="300"
            height="200"
            className="rounded-t-3xl justify-center grid h-80 object-cover"
            alt="poke_image"
          />
        </Box>
        <Box>
          <small className="flex justify-between capitalize border-2 border-red-800 rounded-md pl-6 pr-6 ml-3 mr-3 font-bold">
            No. {selectedPokemon?.id}
            <Box className="capitalize">
              {selectedPokemon?.types[0]?.type?.name} Pokemon
            </Box>
            <span>HT: {convertHeight(selectedPokemon?.height)}</span>
            <span>
              WT: {convertWeight(selectedPokemon?.weight)}{' '}
              <span className="lowercase">lbs.</span>
            </span>
          </small>
        </Box>
        <Box className="group p-4 grid z-10">
          <Box className="flex justify-start items-center capitalize">
            <span className="font-semibold">Ability</span>
            &nbsp;
            <span className="font-semibold text-red-800 text-2xl ml-6">
              {selectedPokemon?.abilities[0]?.ability?.name}
            </span>
          </Box>
          <Box className="h-28">
            <span
              className="line-clamp-5 py-2 text-base font-semibold leading-relaxed"
              style={{ lineHeight: '1.25rem' }}
            >
              {isLoading || isRefetching ? <Spinner /> : truncate(ability, 188)}
            </span>
          </Box>
          <Box className=" grid-cols-2 flex group justify-between">
            <Box className="font-black flex flex-col mt-4">
              <span className="text-xl">Base Exp</span>
              <span className="text-3xl flex gap-x-1 items-center">
                {selectedPokemon?.base_experience}
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                      fill={appearance === THEME.DARK ? '#eeeeec' : '#21201c'}
                    />{' '}
                  </g>
                </svg>
              </span>
            </Box>
            <Box className="flex flex-col items-end">
              <Box className="h-7" />
              <span className="text-3xl  font-bold  gap-x-2 flex">
                #{' '}
                <span className="text-5xl  font-bold  gap-x-2">
                  {selectedPokemon?.id}
                </span>
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
