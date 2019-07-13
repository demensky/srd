import {Observable} from 'rxjs';
import MVCObject = google.maps.MVCObject;
import MapsEventListener = google.maps.MapsEventListener;

export function fromGoogleMapsObject<T>(
  object: MVCObject,
  eventName: string,
): Observable<T> {
  return new Observable<T>(subscriber => {
    const listener: MapsEventListener = object.addListener(eventName, event => {
      subscriber.next(event);
    });

    return () => {
      listener.remove();
    };
  });
}
