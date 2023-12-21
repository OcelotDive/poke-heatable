// @ts-nocheck
import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Context } from '../../context';
import { useContext } from 'react';
import { THEME } from '../constants/paging';

export const ThemeButton: React.FC = () => {
  const { setAppearance } = useContext(Context);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
  const handleThemeChange = () => {
    isLightTheme ? setAppearance(THEME.DARK) : setAppearance(THEME.LIGHT);
    setIsLightTheme(!isLightTheme);
  };
  return (
    <IconButton className="cursor-pointer" onClick={handleThemeChange}>
      {isLightTheme ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
