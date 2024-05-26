// import { INPUT_CLASSES } from "~/commonUIClasses";

import { INPUT_CLASSES } from "@/app/commonUIClasses";

interface Option {
  label: string;
  value: string;
}
interface SelectInputProps {
  options: Option[];
  value?: string;
  error?: string;
  register?: any;
  onSelect?: (selectedValue: string) => void; // Define the callback prop
}

export default function SelectInput({ options, value, register, error, onSelect = () => { }, }: SelectInputProps) {
  const { onChange } = register ?? {};
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    onSelect(e.target.value);
  };
  

  return (
    <select
      className={`${INPUT_CLASSES} ${error && 'border-red-500'}`}
      value={value}
      onChange={handleSelectChange}
      {...register}
      data-testid="select"

    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
