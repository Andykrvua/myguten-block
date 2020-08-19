const { createElement, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { ToggleControl, PanelBody, PanelRow } = wp.components;

const render = (props) => {
  return createElement(
    Fragment,
    {},
    createElement(
      InspectorControls,
      {},
      createElement(
        PanelBody,
        { title: "Filter", initialOpen: true },
        createElement(
          PanelRow,
          {},
          createElement(ToggleControl, {
            label: "Enable filter",
            onChange: (event) => {
              props.setAttributes({ filter: event });
            },
            checked: props.attributes.filter,
          })
        )
      )
    )
  );
};

const filterControl = (props) => render(props);

export default filterControl;
