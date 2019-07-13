import {InjectionToken} from '@angular/core';
import {ProprietaryMapItem} from '../proprietary/proprietary-map-item';

export const GOOGLE_MAPS_MAP_ITEM_TOKEN = new InjectionToken<
  ProprietaryMapItem
>('');
