'use client';

import { type FC, Fragment } from 'react';

import {
  Menu as MenuInner,
  MenuHeader as MenuHeaderInner,
  MenuItem as MenuItemInner,
  SubMenu as MenuSubMenuInner,
  MenuButton,
  type FocusableItemModifiers
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import s from './styles.module.css';
import type * as T from './types';

const Menu = (props: any): JSX.Element => <MenuInner {...props} menuClassName={s.reactMenu} />;
const MenuHeader = (props: any): JSX.Element => <MenuHeaderInner {...props} className={s.reactMenuHeader}/>;

const MenuItem = (props: any): JSX.Element => {

  const menuItemClassName = ({ hover, disabled }: FocusableItemModifiers): string =>
    disabled
      ? s.reactMenuItemDisable
      : hover
        ? s.reactMenuItemHover
        : s.reactMenuItem;

  return <MenuItemInner {...props} className={menuItemClassName}/>;

};

const SubMenu = (props: any): JSX.Element => {

  const menuItemClassName = ({ hover, disabled }: FocusableItemModifiers): string =>
    disabled
      ? s.reactMenuItemDisable
      : hover
        ? s.reactMenuItemHover
        : s.reactMenuItem;

  return (
    <MenuSubMenuInner
      {...props}
      menuClassName={s.reactMenu}
      itemProps={{ className: menuItemClassName }}/>
  );

};

const DropdownMenu: FC<T.IMenuProps> = ({ children, groups }) => {

  return (
    <Menu
      align="end"
      gap={16}
      menuButton={<MenuButton>{children}</MenuButton>}
      transition
    >
      {
        groups.map(({ type, label, options, subMenuGroupLabel }, index) => (
          <Fragment key={index}>
            {
              (type === 'header')
                ? (
                  <>
                    <MenuHeader>{label}</MenuHeader>
                    {
                      options.map(({ name, callback }, index) => (
                        <MenuItem key={index} onClick={callback}>{name}</MenuItem>
                      ))
                    }
                  </>
                  )
                : (
                    <>
                      {
                        subMenuGroupLabel && <MenuHeader>{subMenuGroupLabel}</MenuHeader>
                      }
                      <SubMenu label={label}>
                        {
                          options.map(({ name, callback }, index) => (
                            <MenuItem key={index} onClick={callback}>{name}</MenuItem>
                          ))
                        }
                      </SubMenu>
                    </>
                  )
            }
          </Fragment>
        ))
      }
    </Menu>
  );

};

export default DropdownMenu;
