// tslint:disable-next-line:no-namespace
declare namespace google.maps {
  export interface MarkerOptions {
    crossOnDrag?: boolean;
  }

  export interface Circle {
    setZIndex(zIndex: number): void;
    getZIndex(): number;
    setClickable(flag: boolean): void;
  }
}
