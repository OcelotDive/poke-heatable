import { Box } from '@radix-ui/themes';
import React from 'react';

export const NoResultsAlert: React.FC = ({}) => {
  return (
    <Box
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">No results found.</p>
      <p>Try being more specific.</p>
    </Box>
  );
};
