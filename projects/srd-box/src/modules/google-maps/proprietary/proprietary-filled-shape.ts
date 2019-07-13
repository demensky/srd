import {ProprietaryFilledShapeOptions} from './proprietary-filled-shape-options';
import {ProprietaryShape} from './proprietary-shape';

export interface ProprietaryFilledShape extends ProprietaryShape {
  setOptions(options: ProprietaryFilledShapeOptions): void;
}
