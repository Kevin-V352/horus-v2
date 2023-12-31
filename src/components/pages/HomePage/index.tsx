import { type FC } from 'react';

import { Calendar } from '@/icons';
import { Card, ForecastCard } from '@/ui';

import type * as T from './types';

const HomePage: FC<T.HomePageProps> = ({ weather }) => {

  return (
    <main className="bg-blue-900 grid grid-cols-2">
      <div className="min-h-screen p-8">

      </div>
      <div className="bg-black_transparent_03 min-h-screen p-8 grid gap-2.5 grid-cols-3 auto-rows-min">
        <div className='col-start-1 col-end-4'>
          <ForecastCard data={weather?.daily} />
        </div>
        {
          Array(6).fill(1).map((_value, key) => (
            <Card
              key={key}
              headIcon={<Calendar />}
              title="pepe-title"
            >
              <div>
                hola
              </div>
            </Card>
          ))
        }
        <div className='col-start-1 col-end-4'>
          <Card
            headIcon={<Calendar />}
            title="pepe-title"
          >
            <div>
              hola
            </div>
          </Card>
        </div>
      </div>
    </main>
  );

};

export default HomePage;
