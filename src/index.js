import { createElement as h } from 'react';
import { observer } from 'mobx-react';

function _view({ vm, toggle, checkbox, childContainer }) {
    const children =
        vm.children &&
        vm.children.length !== 0 &&
        vm.children.map(child =>
            h(view, {
                key: child.text,
                vm: child,
                toggle,
                checkbox,
                childContainer
            }
        ));

    const stateMods = ['open', 'selected', 'disabled']
        .map(state => vm[state] ? `m-${ state }` : '')
        .join(' ');

    return h('div', { className: `tree-node ${ stateMods }` },
        h(toggle, { vm: vm, className: 'tree-open-toggle', onClick: () => vm.open = !vm.open }),
        h(checkbox, {
            vm: vm,
            className: 'tree-selected-toggle',
            type: 'checkbox',
            checked: vm.selected,
            onChange: e => vm.selected = !vm.selected
        }),
        vm.text,
        h(childContainer, { vm: vm, className: 'tree-child-container' }, children)
    );
}
_view.defaultProps = {
    toggle: defaultToggle,
    checkbox: defaultCheckbox,
    childContainer: defaultChildContainer
}

export const view = observer(_view);

export function defaultToggle({ vm, ...rest }) {
    return h('div', rest, vm.open ? '-' : '+');
}

export function defaultCheckbox({ vm, ...rest }) {
    return h('input', rest);
}

export function defaultChildContainer({ vm, ...rest }) {
    return h('div', rest);
}
