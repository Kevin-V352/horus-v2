import { type FC } from 'react';

import s from './styles.module.css';
import type * as T from './types';

const Button: FC<T.IButtonProps> = ({ children, loading, ...props }) => {

  return (
    <button
      {...props}
      className="transition-all ease-out duration-500 cursor-pointer outline outline-2 rounded-xl p-2 text-white outline-white disabled:text-gray-400 disabled:outline-gray-400"
    >
      <div className="flex flex-row justify-center items-center gap-2">
        {children}
        {
          loading && (
            <span className={`${s.loader} ${props.disabled ? s.loaderDisabled : ''}`}></span>
          )
        }
      </div>
    </button>
  );

};

export default Button;
