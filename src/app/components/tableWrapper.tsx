import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from '@radix-ui/themes';
import { Pagination } from './pagination';
import { Paging } from '../constants/paging';
import { NoResultsAlert } from './noResultsAlert';
import { PageSizing } from './pageSizing';

type Props = {
  list: any[];
  count: number;
  getList: (options: Paging) => void;
  skip: number;
  updateSkip: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isRefetching: boolean;
  isSearchMode: boolean;
  handleTableClick: (item: any) => void;
  updatePageSizing: Dispatch<SetStateAction<number>>;
  pageSize: number;
};

export const TableWrapper: React.FC<Props> = ({
  list,
  count,
  getList,
  skip,
  updateSkip,
  isLoading,
  isRefetching,
  isSearchMode,
  handleTableClick,
  updatePageSizing,
  pageSize,
}) => {
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  useEffect(() => {
    //Todo find a better way of handling this alert
    let timer: string | number | NodeJS.Timeout | undefined;
    if (list && !list.length) {
      timer = setTimeout(() => {
        setDisplayAlert(true);
      }, 1000);
    } else {
      setDisplayAlert(false);
    }
    return () => clearInterval(timer);
  }, [list]);

  const headers = useMemo(() => {
    return [
      {
        id: 0,
        title: 'Name',
      },
      {
        id: 1,
        title: 'Base Experience',
      },

      {
        id: 2,
        title: 'HP',
      },
      {
        id: 3,
        title: 'Primary Item Held',
      },
      {
        id: 4,
        title: 'Number of Abilities',
      },
      {
        id: 5,
        title: 'Number of Moves',
      },
      {
        id: 6,
        title: 'Height',
      },
      {
        id: 7,
        title: 'Weight',
      },
    ];
  }, []);

  return (
    <>
      <Box
        className="h-400 
        scrollbar
        scrollbar-thin
        scrollbar-thumb-gray-600
        scrollbar-track-gray-600
        overflow-scroll "
        style={{
          maxHeight: '39rem',
          minHeight: '39rem',
        }}
      >
        <TableRoot size="3">
          <TableHeader>
            {displayAlert ? (
              <TableRow>
                <TableCell>
                  <NoResultsAlert />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableColumnHeaderCell>
                  <img
                    className="h-12 w-12  
                  flex-none 
                  rounded-full 
                  bg-gray-50"
                    src=""
                    alt=""
                    style={{
                      minHeight: '3rem',
                      minWidth: '3rem',
                      visibility: 'hidden',
                    }}
                  />
                </TableColumnHeaderCell>
                {headers.map((header) => (
                  <TableColumnHeaderCell key={header.id}>
                    {header.title}
                  </TableColumnHeaderCell>
                ))}
              </TableRow>
            )}
          </TableHeader>
          {!isLoading && !isRefetching && (
            <TableBody className="fade-in-tableBody">
              {list?.map((item, index) => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => handleTableClick(item)}
                    key={index}
                  >
                    <TableCell>
                      <img
                        className="h-12 w-12  flex-none rounded-full bg-gray-50"
                        src={item?.sprites?.front_default}
                        alt="Pokemon_image"
                        style={{ minHeight: '3rem', minWidth: '3rem' }}
                      />
                    </TableCell>
                    <TableCell className="align-middle">{item?.name}</TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.base_experience}
                    </TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.stats[0]?.base_stat}
                    </TableCell>
                    <TableCell className="align-middle">
                      {item?.held_items[0]?.item?.name ?? 'N/A'}
                    </TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.abilities?.length ?? '0'}
                    </TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.moves?.length ?? '0'}
                    </TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.height ?? 'N/A'}
                    </TableCell>
                    <TableCell className="align-middle" align="center">
                      {item?.weight ?? 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </TableRoot>
      </Box>
      <Box>
        <PageSizing updatePageSizing={updatePageSizing} />
        {!displayAlert && !isSearchMode && (
          <Pagination
            count={count}
            getList={getList}
            skip={skip}
            updateSkip={updateSkip}
            pageSize={pageSize}
          />
        )}
      </Box>
    </>
  );
};
