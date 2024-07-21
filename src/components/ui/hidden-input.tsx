import { InputProps } from "./input";

export default function HiddenInput(props: InputProps) {
  return <input className="hidden" {...props} />;
}
