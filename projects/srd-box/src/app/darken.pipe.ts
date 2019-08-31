import {Pipe, PipeTransform} from '@angular/core';
import Color = require('color');

@Pipe({name: 'darken'})
export class DarkenPipe implements PipeTransform {
    public transform(value: Color, ratio: number): Color {
        return value.darken(ratio);
    }
}
