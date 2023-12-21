import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  updatePageSizing: Dispatch<SetStateAction<number>>;
};

export const PageSizing: React.FC<Props> = ({ updatePageSizing }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePageSizing(Number(e.target.value));
  };
  return (
    <>
      <label htmlFor="pageSize" className="block text-sm font-medium">
        Page size
      </label>
      <select
        id="pageSize"
        className="bg-amber-300
        border border-gray-300 
        text-gray-900 text-sm 
        hover:bg-amber-400
        rounded-lg focus:ring-blue-500 
        block w-20 p-2.5 text-black"
        onChange={(e) => handleChange(e)}
      >
        <option value={10}>10</option>
        <option selected value={20}>
          20
        </option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
};
