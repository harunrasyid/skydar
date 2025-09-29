export interface IVehicleAnimState {
  uid: string;
  routeNetworkId: string;
  prev: [number, number];
  next: [number, number];
  startTime: number;
  duration: number;
  fromBearing: number;
  toBearing: number;
  lastUpdateTime: number;
  isMoving: boolean;
}
