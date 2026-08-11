export interface CheckboxProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: string;
}
