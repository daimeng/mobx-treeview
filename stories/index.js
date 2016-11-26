import React from 'react';
import { observable, extendObservable } from 'mobx';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import * as Tree from '../src';
import 'font-awesome-webpack';
import FontAwesome from 'react-fontawesome';
import basicStyle from 'style/useable!css!./basic.css';

var sampleState = {
    open: true,
    text: 'Animals',
    selected: true,
    children: [{
        open: true,
        text: 'Birds',
        selected: false,
        children: [{
            open: false,
            text: 'Raven',
            selected: false
        }]
    }, {
        open: false,
        text: 'Monotremes',
        selected: false,
        children: [{
            open: true,
            selected: true,
            text: 'Echidna'
        },{
            open: true,
            selected: true,
            text: 'Platypus'
        }]
    }]
};

function CustomNode({ children, selected, ...rest }) {
    extendObservable(this, {
        _selected: selected,
        get selected() {
            if (this._selected) {
                return 1;
            } else if (this.children.some(child => child.selected)) {
                return 2;
            } else {
                return 0;
            }
        },
        // probably should just use explicit setter, just testing newer mobx feature
        set selected(ignoredValue) {
            this._selected = !this._selected;
        },
        children: children ? children.map(childProps => new this.constructor(childProps)) : [],
        ...rest
    });
}

const CustomToggle = ({ vm, ...rest }) =>
    <div { ...rest }>
        { vm.children.length ? <FontAwesome name={ vm.open ? 'caret-square-o-down' : 'caret-square-o-right' } /> : null }
    </div>

const ICON_MAP = ['star-o', 'star', 'star-half'];
const CustomCheckbox = ({ vm, ...rest }) =>
    <div className={ rest.className } onClick={ rest.onChange }><FontAwesome name={ ICON_MAP[vm.selected] } /></div>

const CustomTree = props =>
    <Tree.view
        vm={ props.vm }
        toggle={ CustomToggle }
        checkbox={ CustomCheckbox }
    />

storiesOf('Tree', module)
    .add('basic use', () => {
        basicStyle.use();

        return <Tree.view vm={ observable(sampleState) } />;
    })
    .add('more customization', () => {
        basicStyle.use();

        return <CustomTree vm={ new CustomNode(sampleState) } />;
    })