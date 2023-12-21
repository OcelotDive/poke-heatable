import { Box } from '@radix-ui/themes';
import React from 'react';

export const Nav: React.FC = () => {
  return (
    <Box className="sticky top-0 p-4 bg-amber-300 rounded-xl w-full">
      <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
        <li className="py-2 hover:bg-amber-400 rounded">
          <a className="truncate" href="#">
            <img
              src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
              className="w-7 sm:mx-2 mx-4 inline"
            />
            <span className="hidden sm:inline text-black">Pokemon Home</span>
          </a>
        </li>
      </ul>
    </Box>
  );
};
