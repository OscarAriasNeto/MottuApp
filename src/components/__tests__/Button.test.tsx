import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Button } from '../Button';
import { lightTheme } from '../../theme';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <ThemeProvider theme={lightTheme}>
        <Button title="Salvar" onPress={onPress} />
      </ThemeProvider>,
    );

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalled();
  });
});
