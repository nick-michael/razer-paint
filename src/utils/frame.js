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
    for (let i = 0; i < CANVAS_HEIGHT; i += 1) {
        const columns = [];
        for (let j = 0; j < CANVAS_WIDTH; j += 1) {
            let color = frame[count];
            color = `0x${color.substring(4, 6)}${color.substring(2, 4)}${color.substring(0, 2)}`;
            columns.push(parseInt(color, 16));
            count += 1;
        }
        rows.push(columns);
    }
    return rows;
};

export const compressAnimation = (animation) => {
    const compressedAnimation = [];
    for (let index = animation.length - 1; index > 0; index -= 1) {
        const currentFrame = animation[index];
        const previousFrame = animation[index - 1];
        const compressedFrame = {};
        Object.keys(currentFrame).forEach((pixel) => {
            if (currentFrame[pixel] !== previousFrame[pixel]) {
                compressedFrame[pixel] = currentFrame[pixel];
            }
        });
        compressedAnimation.unshift(compressedFrame);
    }
    compressedAnimation.unshift(animation[0]);
    return compressedAnimation;
};

export const decompressAnimation = (compressedAnimation) => {
    const decompressedAnimation = [compressedAnimation[0]];
    for (let index = 1; index < compressedAnimation.length; index += 1) {
        decompressedAnimation.push(
            { ...decompressedAnimation[index - 1], ...compressedAnimation[index] },
        );
    }
    return decompressedAnimation;
};

export const keycodeToPixels = () => ({
    Escape: ['1', '2'],
    F1: ['3'],
    F2: ['4'],
    F3: ['5'],
    F4: ['6'],
    F5: ['7'],
    F6: ['8'],
    F7: ['9'],
    F8: ['10'],
    F9: ['11'],
    F10: ['12'],
    F11: ['13'],
    F12: ['14'],
    PrintScreen: ['15'],
    ScrollLock: ['16'],
    Pause: ['17'],
    Backquote: ['23'],
    Digit1: ['24'],
    Digit2: ['25'],
    Digit3: ['26'],
    Digit4: ['27'],
    Digit5: ['28'],
    Digit6: ['29'],
    Digit7: ['30'],
    Digit8: ['31'],
    Digit9: ['32'],
    Digit0: ['33'],
    Minus: ['34'],
    Equal: ['35'],
    Backspace: ['36', '37'],
    Insert: ['37'],
    Home: ['38'],
    PageUp: ['39'],
    NumLock: ['40'],
    NumpadDivide: ['41'],
    NumpadMultiply: ['42'],
    NumpadSubtract: ['43'],
    Tab: ['45'],
    KeyQ: ['46'],
    KeyW: ['47'],
    KeyE: ['48'],
    KeyR: ['49'],
    KeyT: ['50'],
    KeyY: ['51'],
    KeyU: ['52'],
    KeyI: ['53'],
    KeyO: ['54'],
    KeyP: ['55'],
    BracketLeft: ['56'],
    BracketRight: ['57'],
    Backslash: ['58'],
    Delete: ['59'],
    End: ['60'],
    PageDown: ['61'],
    Numpad7: ['62'],
    Numpad8: ['63'],
    Numpad9: ['64'],
    NumpadAdd: ['65', '87'],
    CapsLock: ['67'],
    KeyA: ['68'],
    KeyS: ['69'],
    KeyD: ['70'],
    KeyF: ['71'],
    KeyG: ['72'],
    KeyH: ['73'],
    KeyJ: ['74'],
    KeyK: ['75'],
    KeyL: ['76'],
    Semicolon: ['77'],
    Quote: ['78'],
    Enter: ['79', '80'],
    Numpad4: ['84'],
    Numpad5: ['85'],
    Numpad6: ['86'],
    ShiftLeft: ['89', '90'],
    KeyZ: ['91'],
    KeyX: ['92'],
    KeyC: ['93'],
    KeyV: ['94'],
    KeyB: ['95'],
    KeyN: ['96'],
    KeyM: ['97'],
    Comma: ['98'],
    Period: ['99'],
    Slash: ['100'],
    ShiftRight: ['101', '102'],
    ArrowUp: ['104'],
    Numpad1: ['106'],
    Numpad2: ['107'],
    Numpad3: ['108'],
    NumpadEnter: ['109', '131'],
    ControlLeft: ['111'],
    MetaLeft: ['112'],
    AltLeft: ['113'],
    Space: ['114', '115', '116', '117', '118', '119', '120'],
    AltRight: ['121'],
    ContextMenu: ['123'],
    ControlRight: ['124'],
    ArrowLeft: ['125'],
    ArrowDown: ['126'],
    ArrowRight: ['127'],
    Numpad0: ['128', '129'],
    NumpadDecimal: ['130'],
});
