export const CANVAS_WIDTH = 22;
export const CANVAS_HEIGHT = 6;

export const initializeFrame = (width = CANVAS_WIDTH, height = CANVAS_HEIGHT) => {
    const frame = {};
    for (let i = 0; i < width * height; i += 1) {
        frame[`${i}`] = '#000';
    }
    return frame;
};

export const frameToPicture = (frame) => {
    let count = 0;
    const picture = [];
    for (let i = 0; i < CANVAS_HEIGHT; i += 1) {
        const row = [];
        for (let j = 0; j < CANVAS_WIDTH; j += 1) {
            row.push(frame[count]);
            count += 1;
        }
        picture.push(row);
    }
    return picture;
};
