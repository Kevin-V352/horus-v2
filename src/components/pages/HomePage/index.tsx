import { type FC } from 'react';

import { Card } from '@/ui';

const HomePage: FC = () => {

  return (
    <main className="bg-blue-900 grid grid-cols-2">
      <div className="min-h-screen p-8">

      </div>
      <div className="bg-emerald-500 min-h-screen p-8 grid gap-2.5 grid-cols-3 auto-rows-min">
        <div className='col-start-1 col-end-4'>
          <Card
            headIcon={<div>pepe</div>}
            title="pepe-title"
          >
            <div>
              hola
            </div>
          </Card>
        </div>
        {
          Array(6).fill(1).map((_value, key) => (
            <Card
              key={key}
              headIcon={<div>pepe</div>}
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
            headIcon={<div>pepe</div>}
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
