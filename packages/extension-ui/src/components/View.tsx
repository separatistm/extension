// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from '../types';

import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// FIXME We should not import from index when this one is imported there as well
import { AvailableThemes, chooseTheme, themes, ThemeSwitchContext } from '.';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function View ({ children, className }: Props): React.ReactElement<Props> {
  const [theme, setTheme] = useState(chooseTheme());
  const _theme = themes[theme];

  const switchTheme = (theme: AvailableThemes): void => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  return (
    <ThemeSwitchContext.Provider value={switchTheme}>
      <ThemeProvider theme={_theme}>
        <BodyTheme theme={_theme} />
        <Main className={className}>
          {children}
        </Main>
      </ThemeProvider>
    </ThemeSwitchContext.Provider>
  );
}

const BodyTheme = createGlobalStyle<ThemeProps>`
  body {
    background-color: ${({ theme }: ThemeProps): string => theme.bodyColor};
  }

  html {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }: ThemeProps): string => theme.background};
  color: ${({ theme }: ThemeProps): string => theme.textColor};
  font-size: ${({ theme }: ThemeProps): string => theme.fontSize};
  line-height: ${({ theme }: ThemeProps): string => theme.lineHeight};
  border: 1px solid ${({ theme }: ThemeProps): string => theme.inputBorderColor};

  * {
    font-family: ${({ theme }: ThemeProps): string => theme.fontFamily};
  }

  > * {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export default View;
