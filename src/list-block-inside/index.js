const { Button, PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, BlockControls } = wp.editor;

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const paddingTopOptions = [
      { value: "0", label: __("0px") },
      { value: "10px", label: __("10px") },
      { value: "50px", label: __("50px") },
    ];
    const paddingBottomOptions = [
      { value: "0", label: __("0px") },
      { value: "10px", label: __("10px") },
      { value: "50px", label: __("50px") },
    ];
    const {
      setAttributes,
      attributes: { padding_top, padding_bottom },
    } = this.props;
    return (
      <InspectorControls key="inspector">
        <PanelBody title={__("Настройки списка")}>
          <SelectControl
            label={__("Отступ сверху")}
            options={paddingTopOptions}
            value={padding_top}
            onChange={(top) => setAttributes({ padding_top: top })}
          />
          <SelectControl
            label={__("Отступ снизу")}
            options={paddingBottomOptions}
            value={padding_bottom}
            onChange={(bottom) => setAttributes({ padding_bottom: bottom })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}

class HeadlineBlock extends Component {
  render() {
    const {
      attributes: { content },
      setAttributes,
    } = this.props;

    return [
      <Inspector {...{ setAttributes, ...this.props }} />,

      <div>
        <RichText
          tagName="ul"
          multiline="li"
          placeholder={__("Список")}
          keepPlaceholderOnFocus
          value={content}
          className="items-list"
          onChange={(value) => setAttributes({ content: value })}
        />
      </div>,
    ];
  }
}

registerBlockType("amm-custom-block/list-block-inside", {
  title: "Список",
  icon: "shield",
  category: "AMM",
  parent: ["core/media-text"],
  attributes: {
    content: {
      type: "string",
    },
    padding_top: {
      type: "string",
      default: "0",
    },
    padding_bottom: {
      type: "string",
      default: "0",
    },
  },
  edit: HeadlineBlock,
  //  (props) => {
  //   const onChangeContent = (newContent) => {
  //     props.setAttributes({ content: newContent });
  //   };
  //   return (
  //     <RichText
  //       tagName="ul"
  //       className="items-list"
  //       multiline="li"
  //       onChange={onChangeContent}
  //       value={props.attributes.content}
  //       placeholder={"Заголовок..."}
  //     />
  //   );
  // },

  save: (props) => {
    const {
      attributes: { padding_top, padding_bottom, content },
    } = props;

    return (
      <Fragment>
        {content && !!content.length && (
          <RichText.Content
            className="items-list"
            tagName="ul"
            multiline="li"
            value={content}
            style={
              padding_top != "0" || padding_bottom != "0"
                ? {
                    paddingTop: padding_top,
                    paddingBottom: padding_bottom,
                  }
                : ""
            }
          />
        )}
      </Fragment>
    );
  },
});
