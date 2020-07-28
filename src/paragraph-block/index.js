const { Component, Fragment } = wp.element;

const {
  RichText,
  InspectorControls,
  PanelColorSettings,
  AlignmentToolbar,
  BlockControls,
} = wp.editor;

const { Button, PanelBody, SelectControl } = wp.components;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const backgroundColors = [
      { color: "#525252", name: "Черный" },
      { color: "#872d2d", name: "Акцентный красный" },
      { color: "#e49312", name: "Акцентный желтый" },
      { color: "#bab3a6", name: "Акцентный кремовый" },
    ];

    const fontSizeOptions = [
      { value: "14px", label: __("14px") },
      { value: "16px", label: __("16px") },
      { value: "18px", label: __("18px") },
      { value: "22px", label: __("22px") },
      { value: "28px", label: __("28px") },
    ];

    const paddingTopOptions = [
      { value: "10px", label: __("10px") },
      { value: "50px", label: __("50px") },
    ];
    const {
      setAttributes,
      attributes: { text_color, font_size, padding_top },
    } = this.props;
    return (
      <InspectorControls key="inspector">
        <PanelBody title={__("Настройки абзаца")}>
          <PanelColorSettings
            title={__("Цвет шрифта")}
            initialOpen={true}
            colorSettings={[
              {
                value: text_color,
                colors: backgroundColors,
                onChange: (value) => setAttributes({ text_color: value }),
                label: __("Цвет шрифта"),
              },
            ]}
          />
          <SelectControl
            label={__("Размер шрифта")}
            options={fontSizeOptions}
            value={font_size}
            onChange={(value) => this.props.setAttributes({ font_size: value })}
          />
          <SelectControl
            label={__("Отступ сверху")}
            options={paddingTopOptions}
            value={padding_top}
            onChange={(value) =>
              this.props.setAttributes({ padding_top: value })
            }
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}

class HeadlineBlock extends Component {
  render() {
    const {
      attributes: { headline, text_color, font_size, padding_top, alignment },
      setAttributes,
    } = this.props;

    const onChangeAlignment = (newAlignment) => {
      this.props.setAttributes({
        alignment: newAlignment === undefined ? "none" : newAlignment,
      });
    };

    return [
      <Inspector {...{ setAttributes, ...this.props }} />,

      <div>
        {
          <BlockControls>
            <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
          </BlockControls>
        }
        <RichText
          tagName="p"
          placeholder={__("Текст...")}
          keepPlaceholderOnFocus
          value={headline}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          className={"font-" + font_size + " post-desc__p-text"}
          style={{
            color: text_color,
            textAlign: alignment,
          }}
          onChange={(value) => setAttributes({ headline: value })}
        />
      </div>,
    ];
  }
}

registerBlockType("amm-custom-block/paragraph-block", {
  title: __("Абзац"),
  icon: "shield",
  category: "AMM",
  attributes: {
    headline: {
      type: "string",
    },
    alignment: {
      type: "string",
      default: "none",
    },
    text_color: {
      type: "string",
      default: "#525252",
    },
    font_size: {
      type: "string",
      default: "14px",
    },
    padding_top: {
      type: "string",
      default: "50px",
    },
  },
  edit: HeadlineBlock,
  save: function (props) {
    const {
      attributes: { headline, text_color, font_size, padding_top, alignment },
    } = props;
    return (
      <Fragment>
        {headline && !!headline.length && (
          <RichText.Content
            tagName="p"
            className={"font-" + font_size + " post-desc__p-text"}
            style={{
              color: text_color,
              paddingTop: padding_top,
              textAlign: alignment,
            }}
            value={headline}
          />
        )}
      </Fragment>
    );
  },
});
