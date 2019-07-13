import {dest, src, task} from 'gulp';
import {
    height as virtualHeight,
    scales,
    types,
    widths,
} from './imagesConfigs.json';

const responsive = require('gulp-responsive');

task('default', () => {
    const variants = scales.flatMap(scale =>
        types.flatMap(typeName =>
            widths.flatMap(virtualWidth => {
                const width = virtualWidth * scale;
                const height = virtualHeight * scale;
                const extname = `.${typeName}`;
                const suffix = `-${width}x${height}`;

                return {width, height, rename: {suffix, extname}};
            }),
        ),
    );

    return src('projects/srd-box/src/assets/images/*.{png,jpg}')
        .pipe(responsive({'*': variants}, {errorOnEnlargement: false}))
        .pipe(dest('dist/srd-box/assets/images'));
});
