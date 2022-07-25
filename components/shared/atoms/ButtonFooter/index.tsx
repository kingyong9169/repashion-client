import Button from '@atoms/Button';
import classnames from 'classnames';
import type { DefaultProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  background?: string;
  onClick?: () => void;
  msg?: string;
} & DefaultProps;

export default function ButtonFooter({
  className,
  style,
  children,
  background,
  onClick,
  msg,
}: Props) {
  return (
    <footer
      className={classnames($['btn-footer'], className)}
      style={{ ...style }}
    >
      <Button
        errorMsg={msg}
        onClick={onClick}
        background={background}
        className={$.btn}
      >
        {children}
      </Button>
      {msg && <span className={$['error-msg']}>{msg}</span>}
    </footer>
  );
}
