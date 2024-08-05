export interface UserInfo {
  id?: number;
  coins: number;
  tickets: number;
  coinsFromRefs: number;
  earnedCoins: number;
  refLinkStatus: boolean;
  refId: string;
  tgId: string;
  speedLevel: number;
  volumeLevel: number;
  timeLevel: number;
  lastFarmStart: string | null;
  lastRefClaim: string | null;
}
