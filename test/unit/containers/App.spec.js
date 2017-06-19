import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../src/containers/App';
import * as canvasActions from '../../../src/actions/canvasActions';
import fakeStore from '../reduxUtils';

describe('App Container', () => {
    let state;
    let setColorSpy;

    const createAppComponent = () => shallow(
        <App store={fakeStore(state)} />,
    );

    beforeEach(() => {
        state = {
            frames: {
                animate: [{}],
                selectedFrame: 0,
                isPlaying: false,
                clipboard: null,
            },
            canvas: {
                brushColor: 'ffffff',
                presetColors: ['FF0000', 'FF8000', 'FFF700', '00FF03', '00FFFA', '000CFF', '9900FF', 'FD00FF'],
            },
        };

        setColorSpy = sinon.spy(canvasActions, 'setColor');
    });

    afterEach(() => {
        setColorSpy.restore();
    });

    it('should set 6 digit hex without the `#`', () => {
        const appComponent = createAppComponent();
        appComponent.props().setLongHexColor('#fafafa');

        sinon.assert.calledWith(setColorSpy, 'fafafa');
    });

    it('should set 3 digit hex correctly without the `#`', () => {
        const appComponent = createAppComponent();
        appComponent.props().setLongHexColor('#faf');

        sinon.assert.calledWith(setColorSpy, 'ffaaff');
    });

    it('should not dispatch a color that is not length 3 or 6', () => {
        const appComponent = createAppComponent();
        appComponent.props().setLongHexColor('#faaf');

        sinon.assert.notCalled(setColorSpy);
    });
});
