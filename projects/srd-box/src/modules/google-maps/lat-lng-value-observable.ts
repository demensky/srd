import {MvcValueObservable} from './mvc-value-observable';

export class LatLngValueObservable extends MvcValueObservable<
  google.maps.LatLng
> {
  protected _isEquals(
    currentValue: google.maps.LatLng,
    newValue: google.maps.LatLng,
  ): boolean {
    return currentValue.equals(newValue);
  }
}
