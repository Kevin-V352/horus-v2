import { type FC } from 'react';

import { CaretDownFill } from '@/icons';

import s from './styles.module.css';
import type * as T from './types';

const Accordion: FC<T.AccordionProps> = ({ children }) => {

  return (
    <div className={s.accordion}>
      <input className={s.accordionCheckbox} type="checkbox" id="tab1" />
      <label className={s.accordionLabel} htmlFor="tab1"><CaretDownFill size={24}/></label>
      <div className={s.accordionContent}>
        {children}
      </div>
    </div>
  );

};

export default Accordion;
