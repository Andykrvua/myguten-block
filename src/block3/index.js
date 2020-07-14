const { Component } = wp.element;

import icons from "./icons";

const {
  RichText,
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
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
      { color: "#00d1b2", name: "teal" },
      { color: "#3373dc", name: "royal blue" },
      { color: "#209cef", name: "sky blue" },
      { color: "#22d25f", name: "green" },
      { color: "#ffdd57", name: "yellow" },
      { color: "#ff3860", name: "pink" },
      { color: "#7941b6", name: "purple" },
      { color: "#392F43", name: "black" },
    ];

    const fontSizeOptions = [
      { value: "18px", label: __("18px") },
      { value: "20px", label: __("20px") },
      { value: "22px", label: __("22px") },
      { value: "24px", label: __("24px") },
      { value: "26px", label: __("26px") },
      { value: "28px", label: __("28px") },
      { value: "30px", label: __("30px") },
      { value: "32px", label: __("32px") },
    ];
    const {
      setAttributes,
      attributes: { text_color, font_size },
    } = this.props;
    return (
      <InspectorControls key="inspector">
        <PanelBody>
          <PanelColorSettings
            title={__("Text Color")}
            initialOpen={true}
            colorSettings={[
              {
                value: text_color,
                colors: backgroundColors,
                onChange: (value) => setAttributes({ text_color: value }),
                label: __("Text Color"),
              },
            ]}
          />
          <SelectControl
            label={__("Font size")}
            description={__("")}
            options={fontSizeOptions}
            value={font_size}
            onChange={(value) => this.props.setAttributes({ font_size: value })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}

class HeadlineBlock extends Component {
  render() {
    const {
      attributes: { headline, iconUrl, iconId, text_color, font_size },
      setAttributes,
    } = this.props;

    return [
      <Inspector {...{ setAttributes, ...this.props }} />,
      <div
        id="custom-headline"
        className={"font-" + font_size}
        style={{
          color: text_color,
        }}
      >
        <MediaUpload
          buttonProps={{
            className: "change-image",
          }}
          onSelect={(img) =>
            setAttributes({
              iconUrl: img.url,
              iconId: img.id,
            })
          }
          type="image"
          value={iconId}
          render={({ open }) => (
            <Button onClick={open}>
              {!iconId ? (
                <div className="icon">{icons.upload}</div>
              ) : (
                <img
                  className="custom-headline-icon"
                  src={iconUrl}
                  alt="avatar"
                />
              )}
            </Button>
          )}
        />

        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add headline text...")}
          keepPlaceholderOnFocus
          value={headline}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          className="custom-headline-text"
          style={{
            color: text_color,
          }}
          onChange={(value) => setAttributes({ headline: value })}
        />
      </div>,
    ];
  }
}

registerBlockType("myguten-block/test-block3", {
  title: __("Custom Headline with Icon"),
  icon: {
    src: icons.icon,
  },
  category: "AMM",
  attributes: {
    headline: {
      type: "string",
    },
    iconUrl: {
      type: "string",
      default: "https://unsplash.it/30/30",
    },
    iconId: {
      type: "int",
      default: null,
    },
    text_color: {
      type: "string",
      default: "black",
    },
    font_size: {
      type: "string",
      default: "20px",
    },
  },
  edit: HeadlineBlock,
  save: function (props) {
    const {
      attributes: { headline, iconUrl, text_color, font_size },
    } = props;
    return (
      <div
        id="custom-headline"
        className={"font-" + font_size}
        style={{
          color: text_color,
        }}
      >
        <img src={iconUrl} />
        {headline && !!headline.length && (
          <RichText.Content
            tagName="div"
            className="custom-headline-text"
            style={{
              color: text_color,
            }}
            value={headline}
          />
        )}
      </div>
    );
  },
});
