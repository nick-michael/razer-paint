import * as os from 'os';
import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

export const float = os.platform() === 'darwin' ? 'left' : 'right';

export const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
};

export const handleClose = () => {
    remote.getCurrentWindow().close();
};
