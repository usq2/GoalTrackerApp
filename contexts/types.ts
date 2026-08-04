import { light } from '../design_tokens/colors';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorPallete = typeof light;
export interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  colors: ColorPallete; // Added colors object
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
