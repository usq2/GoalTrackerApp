import { light } from '@ui/design_tokens/colors';
import { spacing } from '@ui/design_tokens/spacing';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorPallete = typeof light;
export type Spacing = typeof spacing;
export interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  colors: ColorPallete;
  spacing: Spacing;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
