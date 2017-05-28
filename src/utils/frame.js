export const CANVAS_WIDTH = 22;
export const CANVAS_HEIGHT = 6;

export const initializeFrame = (width = CANVAS_WIDTH, height = CANVAS_HEIGHT) => {
    const frame = {};
    for (let i = 0; i < width * height; i += 1) {
        frame[`${i}`] = '000000';
    }
    return frame;
};

export const frameToPicture = (frame) => {
    let count = 0;
    const picture = [];
    for (let i = 0; i < CANVAS_HEIGHT; i += 1) {
        const row = [];
        for (let j = 0; j < CANVAS_WIDTH; j += 1) {
            row.push(`#${frame[count]}`);
            count += 1;
        }
        picture.push(row);
    }
    return picture;
};

export const frameToSdk = (frame) => {
    const rows = [];
    let count = 0;
    for (var i = 0; i < CANVAS_HEIGHT; i++) {
        let columns = [];
        for (var j = 0; j < CANVAS_WIDTH; j++) {
            let color = frame[count];
            color = `0x${color.substring(4, 6)}${color.substring(2, 4)}${color.substring(0, 2)}`;
            columns.push(parseInt(color));
            count += 1;
        }
        rows.push(columns);
    }
    return rows;
};

export const compressAnimation = (animation) => {
    const compressedAnimation = [];
        for (var index = animation.length - 1; index > 0; index--) {
            const currentFrame = animation[index];
            const previousFrame = animation[index - 1];
            const compressedFrame = {};
            for (var pixel in currentFrame) {
                if (currentFrame[pixel] !== previousFrame[pixel]) {
                    compressedFrame[pixel] = currentFrame[pixel];
                }
            }
            compressedAnimation.unshift(compressedFrame);
        }
        compressedAnimation.unshift(animation[0]);
        return compressedAnimation;
};

export const decompressAnimation = (compressedAnimation) => {
        const decompressedAnimation = [compressedAnimation[0]];
        for (var index = 1; index < compressedAnimation.length; index++) {
            decompressedAnimation.push({ ...decompressedAnimation[index - 1], ...compressedAnimation[index] });
        }
        return decompressedAnimation;
};
