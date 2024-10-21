import { InputHTMLAttributes } from "react";

import * as Styles from "./styles";

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Styles.Input {...props} />
      <span style={{fontSize: 12, color: 'red'}}>{props.error}</span>
    </div>
  );
};

export default TextField;
