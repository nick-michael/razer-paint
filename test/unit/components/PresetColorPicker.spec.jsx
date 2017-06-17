import React from 'react';
import { shallow } from 'enzyme';

import PresetColorPicker from '../../../src/components/PresetColorPicker';

describe('PresetColorPicker Component', () => {
    let presetColorPicker;

    beforeEach(() => {
        presetColorPicker = shallow(
            <PresetColorPicker
                brushColor="ffffff"
                presetColors={['cccccc', '000000', 'ffffff']}
                setColor={sinon.stub()}
            />
        );
    });

    it('should render color spots based on the preset colors array', () => {
        const colorSpots = presetColorPicker.find('.color-spot').nodes;
        for (var index = 0; index < colorSpots.length; index++) {
            expect(colorSpots[index].props.style.background).to.equal(`#${presetColorPicker.instance().props.presetColors[index]}`);
        }
    });

    it('should select color spot that matches brushColor', () => {        
        expect(presetColorPicker.find('.color-spot').nodes[2].props.className.includes('__selected')).to.be.true;
    });

    it('should not select color spot that doesn\'t match brushColor', () => {        
        expect(presetColorPicker.find('.color-spot').nodes[1].props.className.includes('__selected')).to.be.false;
    });

    it('should call setColor on click', () => {
        presetColorPicker.find('.color-spot').nodes[0].props.onClick();
        sinon.assert.calledWith(presetColorPicker.instance().props.setColor, 'cccccc');
    });
});