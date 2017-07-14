const { remote } = window.require('electron'); // eslint-disable-line import/no-extraneous-dependencies

export const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
};

export const handleClose = () => {
    remote.getCurrentWindow().close();
};
