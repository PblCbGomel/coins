import { useEffect, useState } from 'react';
import './main.css';
import { GetFetch, PatchFetch } from '../../functions/fetch';
import { tg } from '../../App';
import { UserInfo } from '../../interfaces/user';

const LIMIT = 28800000;

export function ProgressBar({ userInfo }: { userInfo: UserInfo | undefined }) {
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastFarmStart || '').getTime()
  );

  useEffect(() => {
    setCurrentDate(new Date().getTime() - new Date(userInfo?.lastFarmStart || '').getTime());
  }, [userInfo]);

  if (!userInfo?.lastFarmStart) {
    return (
      <div
        className="bar"
        onClick={() => {
          PatchFetch({
            path: '/api/farmStart',
            query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
          });
        }}
      >
        <p className="start-farming">Start farming</p>
      </div>
    );
  }
  return (
    <div
      className="bar"
      onClick={() => {
        if (LIMIT - currentDate <= 0) {
          PatchFetch({
            path: '/api/collect',
            query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
          });
        }
      }}
    >
      <div style={{ width: `${(currentDate / LIMIT) * 100}%`, minWidth: '60px' }} className="progress"></div>
      <p className="farming">Farming {userInfo?.earnedCoins}</p>
      <p className="time">
        {currentDate / LIMIT < 1
          ? `${new Date(LIMIT - currentDate).getHours() - 3}h ${new Date(LIMIT - currentDate).getMinutes()}m
        ${new Date(LIMIT - currentDate).getSeconds()}s`
          : 'COLLECT'}
      </p>
    </div>
  );
}
