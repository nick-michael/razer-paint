import React from 'react';
import { shallow } from 'enzyme';

import UpdateOverlay from '../../../src/components/UpdateOverlay';

describe('UpdateOverlay Component', () => {
    it('should render correct update message', () => {
        const updateOverlay = shallow(<UpdateOverlay close={() => {}} />);
        expect(updateOverlay.find('.update-message').at(0).text()).to.equal('There is a new version of Razer Paint!');
    });

    it('should call close on click `OK`', () => {
        const closeStub = sinon.stub();
        const updateOverlay = shallow(<UpdateOverlay close={closeStub} />);
        updateOverlay.find('.update-button-ok').at(0).props().onClick();
        sinon.assert.calledOnce(closeStub);
        closeStub.resetBehavior();
    });
});
