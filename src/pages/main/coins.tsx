import { useEffect, useState } from 'react';
import './main.css';
import { GetFetch } from '../../functions/fetch';
import { tg } from '../../App';
import { UserInfo } from '../../interfaces/user';

export function CoinsInfo({ userInfo }: { userInfo: UserInfo | undefined }) {
  return (
    <div className="coins-wrapper">
      <img alt="coin" src="./icons/coin-main.png" width={36} height={36} />{' '}
      <p className="coins-count">{userInfo?.coins}</p>
    </div>
  );
}
