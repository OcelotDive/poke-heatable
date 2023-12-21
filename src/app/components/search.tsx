import React, { Dispatch, SetStateAction } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { debounce } from '../../helperFunctions/debounce';
import {
  Flex,
  TextFieldRoot,
  TextFieldSlot,
  TextFieldInput,
} from '@radix-ui/themes';

type Props = {
  updateSearchQuery: Dispatch<SetStateAction<string>>;
};

export const Search: React.FC<Props> = ({ updateSearchQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debounceGetList = debounce(
      () => updateSearchQuery(e.target.value),
      3000
    );
    debounceGetList();
  };
  return (
    <Flex
      style={{ maxWidth: 500, border: 'solid red px' }}
      className="mb-4 mr-auto"
    >
      <TextFieldRoot style={{ width: 500 }}>
        <TextFieldSlot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextFieldSlot>
        <TextFieldInput
          radius="full"
          placeholder="Search name"
          onChange={(e) => handleChange(e)}
        />
      </TextFieldRoot>
    </Flex>
  );
};
