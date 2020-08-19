const { __ } = wp.i18n;
const { createElement, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, SelectControl } = wp.components;

const render = (props) => {
  return createElement(
    Fragment,
    {},
    createElement(
      InspectorControls,
      {},
      createElement(
        PanelBody,
        { title: "Шаблон", initialOpen: true },
        createElement(
          PanelRow,
          {}
          //   createElement("div", {
          //     className: "get-posts-block-preview-template",
          //     style: {
          //       backgroundImage: `url("/wp-content/plugins/get-posts-block/images/${props.attributes.template}.png")`,
          //     },
          //   })
        ),
        createElement(
          PanelRow,
          {},
          createElement(SelectControl, {
            // multiple: true,
            label: __("Выберите шаблон вывода"),
            value: props.attributes.template, // e.g: value = [ 'a', 'c' ]
            onChange: (tpl) => {
              console.log(`Selected: ${tpl}`);
              props.setAttributes({ template: tpl });
            },
            options: [
              { value: "default", label: "Шаблон 1" },
              { value: "theme2", label: "Шаблон 2" },
              { value: "theme3", label: "Шаблон 3" },
            ],
          })
        )
      )
    )
  );
};

const templateControl = (props) => render(props);

export default templateControl;
