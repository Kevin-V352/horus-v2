/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client';

import { type FC } from 'react';

import { useRouter } from 'next/navigation';

import { PeopleCircle } from '@/icons';
import { DropdownMenu } from '@/ui';
import { locationTools } from '@/utils';

import type * as T from '../MainComponent/types';

const UserDropdownMenu: FC = () => {

  const router = useRouter();

  console.log(locationTools.getLocationFromLocalHistory());

  const favoriteLocations = locationTools.getLocationFromLocalHistory();

  const profileMenuOptions: T.IGroupOptions[] = [
    {
      label:   'User',
      type:    'header',
      options: [
        { name: 'Login', callback: () => { } }
        // { name: 'Logout', callback: () => { } },
        // { name: 'Delete account', callback: () => { } }
      ]
    },
    {
      label:   'Navigation',
      type:    'header',
      options: [
        { name: 'Search', callback: () => router.push('/location') }
      ]
    },
    {
      label:   'Favorites',
      type:    'header',
      options: [
        ...favoriteLocations.map(({ label, value }) => ({ name: label, callback: () => router.push(`/panel?locationId=${value}`) })),
        { name: 'See more...', callback: () => router.push('/location') }
      ]
    }
  ];

  return (
    <DropdownMenu groups={profileMenuOptions}>
      <PeopleCircle size={36}/>
    </DropdownMenu>
  );

};

export default UserDropdownMenu;
