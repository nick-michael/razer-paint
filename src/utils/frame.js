export default (width = 25, height = 6) => {
    const frame = {};
    for (let i = 0; i < width * height; i += 1) {
        frame[`${i}`] = '#000';
    }
    return frame;
};
