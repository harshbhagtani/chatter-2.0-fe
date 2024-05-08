import { IconType } from "react-icons";

export type MenuOptionType = {
  label: string;
  icon: () => React.JSX.Element;
  action: () => void;
};
