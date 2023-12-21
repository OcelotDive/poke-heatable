'use client';
import { Search } from '../search';
import { usePokemonRequest } from '../../hooks/usePokemonRequest/usePokemonRequest';
import { TableWrapper } from '../tableWrapper';
import { Nav } from '../nav';
import { useEffect, useState } from 'react';
import { pagingOptions } from '@/app/constants/paging';
import { PokemonCard } from '../pokemonCard';
import { Box } from '@radix-ui/themes';
import { ThemeButton } from '../themeButton';

export default function HomeView() {
  const { pokemonList, count, getList, isLoading, isRefetching } =
    usePokemonRequest();

  // search and pagination
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(pagingOptions.skip);
  const [pageSize, setPageSize] = useState<number>(pagingOptions.take);

  const [isPokemonCardOpen, setIsPokemonCardOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<unknown>(null);

  useEffect(() => {
    getList({ skip: pagingOptions.skip, take: pageSize, query: searchQuery });
    if (searchQuery) {
      setIsSearchMode(true);
    } else if (!searchQuery) {
      setIsSearchMode(false);
      setSkip(pagingOptions.skip);
    }
  }, [searchQuery]);

  useEffect(() => {
    getList({ skip: pagingOptions.skip, take: pageSize, query: '' });
    setSkip(pagingOptions.skip);
  }, [pageSize]);

  const handleTableClick = (item: unknown) => {
    setSelectedPokemon(item);
    handleOpenCard();
  };

  const handleOpenCard = () => {
    setIsPokemonCardOpen(true);
  };
  const handleCloseCard = () => {
    setIsPokemonCardOpen(false);
  };
  return (
    <section style={{ pointerEvents: isPokemonCardOpen ? 'none' : 'auto' }}>
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 p-4 w-full">
            <Nav />
          </div>
        </div>

        <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
          <Box className="flex justify-end">
            <ThemeButton />
          </Box>

          <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">
            Pokemon
          </h1>

          <Search updateSearchQuery={setSearchQuery} />
          {isPokemonCardOpen && (
            <PokemonCard
              selectedPokemon={selectedPokemon}
              handleCloseCard={handleCloseCard}
            />
          )}
          <TableWrapper
            list={pokemonList}
            count={count}
            getList={getList}
            skip={skip}
            updateSkip={setSkip}
            isLoading={isLoading}
            isRefetching={isRefetching}
            isSearchMode={isSearchMode}
            handleTableClick={handleTableClick}
            updatePageSizing={setPageSize}
            pageSize={pageSize}
          />
        </main>
      </div>
      <footer className="mt-auto"></footer>
    </section>
  );
}
