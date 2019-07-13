import {InjectionToken} from '@angular/core';

export const GOOGLE_MAPS_MAP_TOKEN = new InjectionToken<google.maps.Map>(
  'google.maps.Map',
);
