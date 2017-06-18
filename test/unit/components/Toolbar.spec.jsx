import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '../../../src/components/Toolbar';
import * as tools from '../../../src/constants/tools';
import * as icons from '../../../src/icons/icons';
import * as fileSystemUtils from '../../../src/utils/fileStytem';

describe('Toolbar Component', () => {
    const sandbox = sinon.sandbox.create();
    let toolbar;
    let saveFileStub;
    let openFileStub;

    beforeEach(() => {
        saveFileStub = sandbox.stub(fileSystemUtils, 'saveFile');
        openFileStub = sandbox.stub(fileSystemUtils, 'openFile');

        toolbar = shallow(
            <Toolbar
              tool={tools.BRUSH}
              canUndo={false}
              canRedo={false}
              isPlaying={false}
              selectedFrame={0}
              fps={30}
              animate={[{}, {}]}
              clipboard={{ 0: 'clpbrd' }}
              copy={sandbox.stub()}
              paste={sandbox.stub()}
              undo={sandbox.stub()}
              redo={sandbox.stub()}
              capture={sandbox.stub()}
              selectTool={sandbox.stub()}
              setFps={sandbox.stub()}
              updateFps={sandbox.stub()}
              toggleEditing={sandbox.stub()}
              isEditing={false}
              insertFrame={sandbox.stub()}
              deleteFrame={sandbox.stub()}
              saveState={{ state: 'value' }}
              loadAnimation={sandbox.stub()}
              playAnimation={sandbox.stub()}
              pauseAnimation={sandbox.stub()}
              toggleReverse={sandbox.stub()}
              isReversed={false}
            />,
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should not add the `toolbar-disabled-playing` class if not isPlaying', () => {
        expect(toolbar.find('.toolbar-disabled-playing').length).to.equal(0);
    });

    it('should add the `toolbar-disabled-playing` class if isPlaying', () => {
        toolbar.setProps({ isPlaying: true });
        expect(toolbar.find('.toolbar-disabled-playing').length).to.be.above(0);
    });

    describe('brush', () => {
        let brush;
        beforeEach(() => {
            brush = toolbar.find('.toolbar-item').at(0);
        });

        it('should render the brush at index 0', () => {
            expect(brush.find(icons.Brush).length).to.equal(1);
        });

        it('should have a tooltip', () => {
            const tooltip = brush.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Brush');
        });

        it('should select the brush tool on click', () => {
            brush.prop('onClick')();
            sinon.assert.calledWith(toolbar.instance().props.selectTool, tools.BRUSH);
        });

        it('should set classname to selected if brush is selected', () => {
            expect(brush.find('.toolbar-item-icon__selected').length).to.equal(1);
        });

        it('should set classname to available if brush is not selected', () => {
            toolbar.setProps({ tool: tools.PICKER });
            brush = toolbar.find('.toolbar-item').at(0);
            expect(brush.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('picker', () => {
        let picker;
        beforeEach(() => {
            picker = toolbar.find('.toolbar-item').at(1);
        });

        it('should render the picker at index 1', () => {
            expect(picker.find(icons.Eyedropper).length).to.equal(1);
        });

        it('should have a tooltip', () => {
            const tooltip = picker.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Color Picker');
        });

        it('should select the picker tool on click', () => {
            picker.prop('onClick')();
            sinon.assert.calledWith(toolbar.instance().props.selectTool, tools.PICKER);
        });

        it('should set classname to selected if picker is selected', () => {
            toolbar.setProps({ tool: tools.PICKER });
            picker = toolbar.find('.toolbar-item').at(1);
            expect(picker.find('.toolbar-item-icon__selected').length).to.equal(1);
        });

        it('should set classname to available if picker is not selected', () => {
            expect(picker.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('eraser', () => {
        let eraser;
        beforeEach(() => {
            eraser = toolbar.find('.toolbar-item').at(2);
        });

        it('should render the eraser at index 2', () => {
            expect(eraser.find(icons.Eraser).length).to.equal(1);
        });

        it('should have a tooltip', () => {
            const tooltip = eraser.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Eraser');
        });

        it('should select the eraser tool on click', () => {
            eraser.prop('onClick')();
            sinon.assert.calledWith(toolbar.instance().props.selectTool, tools.ERASER);
        });

        it('should set classname to selected if eraser is selected', () => {
            toolbar.setProps({ tool: tools.ERASER });
            eraser = toolbar.find('.toolbar-item').at(2);
            expect(eraser.find('.toolbar-item-icon__selected').length).to.equal(1);
        });

        it('should set classname to available if eraser is not selected', () => {
            expect(eraser.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('fill', () => {
        let fill;
        beforeEach(() => {
            fill = toolbar.find('.toolbar-item').at(3);
        });

        it('should render the fill tool at index 3', () => {
            expect(fill.find(icons.Bucket).length).to.equal(1);
        });

        it('should have a tooltip', () => {
            const tooltip = fill.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Fill Tool');
        });

        it('should select the fill tool on click', () => {
            fill.prop('onClick')();
            sinon.assert.calledWith(toolbar.instance().props.selectTool, tools.FILL);
        });

        it('should set classname to selected if fill is selected', () => {
            toolbar.setProps({ tool: tools.FILL });
            fill = toolbar.find('.toolbar-item').at(3);
            expect(fill.find('.toolbar-item-icon__selected').length).to.equal(1);
        });

        it('should set classname to available if fill is not selected', () => {
            expect(fill.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('undo', () => {
        let undo;
        beforeEach(() => {
            undo = toolbar.find('.toolbar-item').at(4);
        });

        it('should render undo at index 4', () => {
            expect(undo.find(icons.Undo).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(undo.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = undo.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Undo');
        });

        it('should undo on click if canUndo', () => {
            toolbar.setProps({ canUndo: true });
            undo = toolbar.find('.toolbar-item').at(4);
            undo.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.undo);
        });

        it('should not undo on click if not canUndo', () => {
            undo.prop('onClick')();
            sinon.assert.notCalled(toolbar.instance().props.undo);
        });

        it('should have `__available` modifier if canUndo', () => {
            toolbar.setProps({ canUndo: true });
            undo = toolbar.find('.toolbar-item').at(4);
            expect(undo.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should not have `__available` modifier if not canUndo', () => {
            expect(undo.find('.toolbar-item-icon__available').length).to.equal(0);
        });
    });

    describe('redo', () => {
        let redo;
        beforeEach(() => {
            redo = toolbar.find('.toolbar-item').at(5);
        });

        it('should render redo at index 5', () => {
            expect(redo.find(icons.Redo).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(redo.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = redo.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Redo');
        });

        it('should redo on click if canRedo', () => {
            toolbar.setProps({ canRedo: true });
            redo = toolbar.find('.toolbar-item').at(5);
            redo.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.redo);
        });

        it('should not redo on click if not canRedo', () => {
            redo.prop('onClick')();
            sinon.assert.notCalled(toolbar.instance().props.redo);
        });

        it('should have `__available` modifier if canRedo', () => {
            toolbar.setProps({ canRedo: true });
            redo = toolbar.find('.toolbar-item').at(5);
            expect(redo.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should not have `__available` modifier if not canRedo', () => {
            expect(redo.find('.toolbar-item-icon__available').length).to.equal(0);
        });
    });

    describe('copy', () => {
        let copy;
        beforeEach(() => {
            copy = toolbar.find('.toolbar-item').at(6);
        });

        it('should render copy at index 6', () => {
            expect(copy.find(icons.Copy).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(copy.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = copy.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Copy');
        });

        it('should copy on click ', () => {
            copy.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.copy);
        });

        it('should have `__available` modifier', () => {
            expect(copy.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('paste', () => {
        let paste;
        beforeEach(() => {
            paste = toolbar.find('.toolbar-item').at(7);
        });

        it('should render paste at index 7', () => {
            expect(paste.find(icons.Paste).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(paste.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = paste.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Paste');
        });

        it('should paste on click if something is in the clipboard', () => {
            paste.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.paste);
        });

        it('should not paste on click if nothing is in the clipboard', () => {
            toolbar.setProps({ clipboard: null });
            paste = toolbar.find('.toolbar-item').at(7);
            paste.prop('onClick')();
            sinon.assert.notCalled(toolbar.instance().props.paste);
        });

        it('should have `__available` modifier if something is in the clipboard', () => {
            expect(paste.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should not have `__available` modifier if nothing is in the clipboard', () => {
            toolbar.setProps({ clipboard: null });
            paste = toolbar.find('.toolbar-item').at(7);
            expect(paste.find('.toolbar-item-icon__available').length).to.equal(0);
        });
    });

    describe('capture', () => {
        let capture;
        beforeEach(() => {
            capture = toolbar.find('.toolbar-item').at(8);
        });

        it('should render capture at index 8', () => {
            expect(capture.find(icons.Capture).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(capture.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = capture.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Capture Frame');
        });

        it('should capture on click', () => {
            capture.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.capture);
        });

        it('should have `__available` modifier', () => {
            expect(capture.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('edit', () => {
        let edit;
        beforeEach(() => {
            edit = toolbar.find('.toolbar-item').at(9);
        });

        it('should render edit at index 9', () => {
            expect(edit.find(icons.Edit).length).to.equal(1);
        });

        it('should not have `toolbar-item-can-disable` class', () => {
            expect(edit.hasClass('toolbar-item-can-disable')).to.be.false;
        });

        it('should have a tooltip', () => {
            const tooltip = edit.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Edit Frame');
        });

        it('should toggleEditing on click', () => {
            edit.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.toggleEditing);
        });

        it('should have `__available` modifier if not editing', () => {
            expect(edit.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should have `__selected` modifier if editing', () => {
            toolbar.setProps({ isEditing: true });
            edit = toolbar.find('.toolbar-item').at(9);
            expect(edit.find('.toolbar-item-icon__selected').length).to.equal(1);
        });
    });

    describe('insert', () => {
        let insert;
        beforeEach(() => {
            insert = toolbar.find('.toolbar-item').at(10);
        });

        it('should render insert at index 10', () => {
            expect(insert.find(icons.Insert).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(insert.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = insert.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Insert Frame');
        });

        it('should insertFrame on click if a frame is selected', () => {
            insert.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.insertFrame);
        });

        it('should not insertFrame on click if no frame is selected', () => {
            toolbar.setProps({ selectedFrame: null });
            insert = toolbar.find('.toolbar-item').at(10);
            insert.prop('onClick')();
            sinon.assert.notCalled(toolbar.instance().props.insertFrame);
        });

        it('should have `__available` modifier if frame is selected', () => {
            expect(insert.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should not have `__available` modifier if no frame is selected', () => {
            toolbar.setProps({ selectedFrame: null });
            insert = toolbar.find('.toolbar-item').at(10);
            expect(insert.find('.toolbar-item-icon__available').length).to.equal(0);
        });
    });

    describe('deleteFrame', () => {
        let deleteFrame;
        beforeEach(() => {
            deleteFrame = toolbar.find('.toolbar-item').at(11);
        });

        it('should render delete at index 11', () => {
            expect(deleteFrame.find(icons.Trashcan).length).to.equal(1);
        });

        it('should have `toolbar-item-can-disable` class', () => {
            expect(deleteFrame.hasClass('toolbar-item-can-disable')).to.be.true;
        });

        it('should have a tooltip', () => {
            const tooltip = deleteFrame.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Delete Frame');
        });

        it('should deleteFrameFrame on click if a frame is selected', () => {
            deleteFrame.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.deleteFrame);
        });

        it('should not deleteFrameFrame on click if no frame is selected', () => {
            toolbar.setProps({ selectedFrame: null });
            deleteFrame = toolbar.find('.toolbar-item').at(11);
            deleteFrame.prop('onClick')();
            sinon.assert.notCalled(toolbar.instance().props.deleteFrame);
        });

        it('should have `__available` modifier if frame is selected', () => {
            expect(deleteFrame.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should not have `__available` modifier if no frame is selected', () => {
            toolbar.setProps({ selectedFrame: null });
            deleteFrame = toolbar.find('.toolbar-item').at(11);
            expect(deleteFrame.find('.toolbar-item-icon__available').length).to.equal(0);
        });
    });

    describe('save', () => {
        let save;
        beforeEach(() => {
            save = toolbar.find('.toolbar-item').at(12);
        });

        it('should render save at index 12', () => {
            expect(save.find(icons.Save).length).to.equal(1);
        });

        it('should not have `toolbar-item-can-disable` class', () => {
            expect(save.hasClass('toolbar-item-can-disable')).to.be.false;
        });

        it('should have a tooltip', () => {
            const tooltip = save.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Save Animation');
        });

        it('should save on click', () => {
            save.prop('onClick')();
            sinon.assert.calledWith(saveFileStub, { state: 'value' });
        });

        it('should have `__available` modifier', () => {
            expect(save.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('open', () => {
        let open;
        beforeEach(() => {
            open = toolbar.find('.toolbar-item').at(13);
        });

        it('should render open at index 13', () => {
            expect(open.find(icons.Open).length).to.equal(1);
        });

        it('should not have `toolbar-item-can-disable` class', () => {
            expect(open.hasClass('toolbar-item-can-disable')).to.be.false;
        });

        it('should have a tooltip', () => {
            const tooltip = open.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Open Animation');
        });

        it('should open on click', () => {
            open.prop('onClick')();
            sinon.assert.calledWith(openFileStub, toolbar.instance().props.loadAnimation);
        });

        it('should have `__available` modifier', () => {
            expect(open.find('.toolbar-item-icon__available').length).to.equal(1);
        });
    });

    describe('play/pause', () => {
        describe('Play (isPlaying=false)', () => {
            let play;
            beforeEach(() => {
                play = toolbar.find('.toolbar-item').at(14);
            });

            it('should render play at index 14', () => {
                expect(play.find(icons.Play).length).to.equal(1);
            });

            it('should not have `toolbar-item-can-disable` class', () => {
                expect(play.hasClass('toolbar-item-can-disable')).to.be.false;
            });

            it('should have a tooltip', () => {
                const tooltip = play.find('.tooltip');
                expect(tooltip.length).to.equal(1);
                expect(tooltip.text()).to.equal('Play');
            });

            it('should play on click if there are animation frames', () => {
                play.prop('onClick')();
                sinon.assert.calledOnce(toolbar.instance().props.playAnimation);
            });

            it('should not play on click if there are not animation frames', () => {
                toolbar.setProps({ animate: [] });
                play = toolbar.find('.toolbar-item').at(14);
                play.prop('onClick')();
                sinon.assert.notCalled(toolbar.instance().props.playAnimation);
            });

            it('should have `__available` modifier if there are animation frames', () => {
                expect(play.find('.toolbar-item-icon__available').length).to.equal(1);
            });

            it('should not have `__available` modifier if there are no animation frames', () => {
                toolbar.setProps({ animate: [] });
                play = toolbar.find('.toolbar-item').at(14);
                expect(play.find('.toolbar-item-icon__available').length).to.equal(0);
            });
        });

        describe('Pause (isPlaying=true)', () => {
            let pause;
            beforeEach(() => {
                toolbar.setProps({ isPlaying: true });
                pause = toolbar.find('.toolbar-item').at(14);
            });

            it('should render play at index 14', () => {
                expect(pause.find(icons.Pause).length).to.equal(1);
            });

            it('should not have `toolbar-item-can-disable` class', () => {
                expect(pause.hasClass('toolbar-item-can-disable')).to.be.false;
            });

            it('should have a tooltip', () => {
                const tooltip = pause.find('.tooltip');
                expect(tooltip.length).to.equal(1);
                expect(tooltip.text()).to.equal('Pause');
            });

            it('should pause on click', () => {
                pause.prop('onClick')();
                sinon.assert.calledOnce(toolbar.instance().props.pauseAnimation);
            });

            it('should have `__available` modifier if there are animation frames', () => {
                expect(pause.find('.toolbar-item-icon__available').length).to.equal(1);
            });
        });
    });

    describe('reverse', () => {
        let reverse;
        beforeEach(() => {
            reverse = toolbar.find('.toolbar-item').at(15);
        });

        it('should render reverse at index 15', () => {
            expect(reverse.find(icons.Rewind).length).to.equal(1);
        });

        it('should not have `toolbar-item-can-disable` class', () => {
            expect(reverse.hasClass('toolbar-item-can-disable')).to.be.false;
        });

        it('should have a tooltip', () => {
            const tooltip = reverse.find('.tooltip');
            expect(tooltip.length).to.equal(1);
            expect(tooltip.text()).to.equal('Reverse Animation');
        });

        it('should reverse on click', () => {
            reverse.prop('onClick')();
            sinon.assert.calledOnce(toolbar.instance().props.toggleReverse);
        });

        it('should have `__available` modifier if not isReversed', () => {
            expect(reverse.find('.toolbar-item-icon__available').length).to.equal(1);
        });

        it('should have `__selected` modifier if isReversed', () => {
            toolbar.setProps({ isReversed: true });
            reverse = toolbar.find('.toolbar-item').at(15);
            expect(reverse.find('.toolbar-item-icon__selected').length).to.equal(1);
        });
    });

    describe('fps slider', () => {
        let slider;
        let sliderInput;

        beforeEach(() => {
            slider = toolbar.find('.toolbar-slider').at(0);
            sliderInput = slider.find('input');
        });

        it('should display the current fps', () => {
            expect(slider.text()).to.equal('fps: 30');
        });

        it('should change the current fps when fps prop changes', () => {
            toolbar.setProps({ fps: 10 });
            slider = toolbar.find('.toolbar-slider').at(0);
            expect(slider.text()).to.equal('fps: 10');
        });

        it('should set the slider value to the current vps', () => {
            expect(sliderInput.props().value).to.equal(30);
        });

        it('should set the max value to 60', () => {
            expect(sliderInput.props().max).to.equal(60);
        });

        it('should set the min value to 1', () => {
            expect(sliderInput.props().min).to.equal(1);
        });

        it('should updateFps on mouse up', () => {
            sliderInput.props().onMouseUp();
            sinon.assert.calledOnce(toolbar.instance().props.updateFps);
        });

        it('should setFps on change', () => {
            sliderInput.props().onChange({ target: { value: 5 } });
            sinon.assert.calledWith(toolbar.instance().props.setFps, 5);
        });
    });
});
