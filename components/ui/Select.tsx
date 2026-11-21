import type {SelectHTMLAttributes} from "react";

export type SelectOption = string | {value: string; label: string; disabled?: boolean};

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "multiple"> & {
  options: readonly SelectOption[];
  /** Shown before a choice is made. It is a disabled option, so it can never be submitted as a value. */
  placeholder?: string;
  /** Marks the field invalid. Pair it with aria-describedby pointing at the error message. */
  invalid?: boolean;
};

/**
 * A styled native <select>. The native element keeps keyboard, screen-reader and mobile picker
 * behaviour intact; only the closed control is restyled. The open option list is drawn by the
 * browser or OS, with colours set in globals.css so it stays legible in light and dark mode.
 * Label it the usual way: wrap it in a <label>, or pass an id that a <label htmlFor> points to.
 */
export default function Select({options, placeholder, invalid, className = "", defaultValue, value, ...props}: Props) {
  const uncontrolledDefault = value === undefined && defaultValue === undefined && placeholder ? "" : defaultValue;

  return (
    <span className="relative block">
      <select
        {...props}
        value={value}
        defaultValue={uncontrolledDefault}
        aria-invalid={invalid || undefined}
        className={`form-control form-select ${className}`}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => {
          const item = typeof option === "string" ? {value: option, label: option} : option;
          return <option key={item.value} value={item.value} disabled={item.disabled}>{item.label}</option>;
        })}
      </select>
      <svg aria-hidden="true" className="select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
