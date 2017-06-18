import React from 'react';
import { shallow } from 'enzyme';

import Pixel from '../../../src/components/Pixel';

describe('Pixel Component', () => {
    it('should render a pixels background color using color from props', () => {
        const pixel = shallow(<Pixel color="ffffff" />);
        expect(pixel.find('.pixel').nodes[0].props.style.backgroundColor).to.equal('#ffffff');
    });

    it('should render a pixels background color using default colo if no color prop', () => {
        const pixel = shallow(<Pixel />);
        expect(pixel.find('.pixel').nodes[0].props.style.backgroundColor).to.equal('#000000');
    });
});
