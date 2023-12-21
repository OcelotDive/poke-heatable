import { Box, Button } from '@radix-ui/themes';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { pagingOptions, Paging } from '../constants/paging';

type Props = {
  count: number;
  getList: (options: Paging) => void;
  skip: number;
  updateSkip: Dispatch<SetStateAction<number>>;
  pageSize: number;
};

export const Pagination: React.FC<Props> = ({
  count,
  getList,
  skip,
  updateSkip,
  pageSize,
}) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const totalPages = Math.round(count / pageSize);

  useEffect(() => {
    setPageNum(1);
  }, [pageSize]);

  const handleNext = () => {
    if (pageNum < totalPages) {
      getList({ skip: skip + pageSize, take: pageSize, query: '' });
      updateSkip(pageNum * pageSize);
      setPageNum((prevState) => prevState + 1);
    }
  };
  const handlePrev = () => {
    if (pageNum > 1) {
      getList({ skip: skip - pageSize, take: pageSize, query: '' });
      updateSkip((prevState) => prevState - pageSize);
      setPageNum((prevState) => prevState - 1);
    }
  };

  const calculateEntriesLeft = () => {
    const total = pageSize * pageNum < count ? pageSize * pageNum : count;
    return total;
  };
  return (
    <>
      <Box className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold">{skip + 1}</span> to{' '}
          <span className="font-semibold">{calculateEntriesLeft()}</span> of{' '}
          <span className="font-semibold">{count}</span> Entries
        </span>
        <Box className="inline-flex mt-2 xs:mt-0">
          <Button
            size="3"
            radius="full"
            className="flex items-center 
            justify-center
            px-3 
            h-8
            w-20
            cursor-pointer"
            onClick={handlePrev}
          >
            Prev
          </Button>
          <div className="pt-1 font-semibold text-sm text-gray-700 dark:text-gray-400 ml-2 mr-2">
            - {pageNum} -
          </div>

          <Button
            size="3"
            radius="full"
            className="flex 
            items-center 
            justify-center 
            px-3 
            h-8
            w-20
            cursor-pointer"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};
