const { platform } = window.require('os');
const { remote } = window.require('electron'); // eslint-disable-line import/no-extraneous-dependencies

export const getFloat = () => {
    const float = platform() === 'darwin' ? 'left' : 'right';
    return float;
};

export const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
};

export const handleClose = () => {
    remote.getCurrentWindow().close();
};
