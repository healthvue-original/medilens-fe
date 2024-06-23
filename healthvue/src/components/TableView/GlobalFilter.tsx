import { Table } from "@tanstack/react-table";
import * as React from "react";
import { Input } from "../ui/input";

export function GlobalFilter({
  tableInstance,
}: {
  tableInstance: Table<any>;
}): JSX.Element {
  const table = tableInstance;
  const filterValue = table.getState().globalFilter;
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <DebouncedInput
        placeholder="Filter data..."
        value={(filterValue as string) ?? ""}
        onChange={(value) => {
          table.setGlobalFilter(value);
        }}
        className="max-w-sm"
      />
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 100,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
