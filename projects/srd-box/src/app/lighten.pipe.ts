import {Pipe, PipeTransform} from '@angular/core';
import Color = require('color');

@Pipe({name: 'lighten'})
export class LightenPipe implements PipeTransform {
    public transform(value: Color, ratio: number): Color {
        return value.lighten(ratio);
    }
}
