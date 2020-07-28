import icons from "./icons.js";

const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText } = wp.editor;
const { PanelBody, RadioControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("amm-custom-block/test-block4", {
  title: __("Headline with Icon", "polandtravel"),
  description: __(
    "A headline block with custom icon to choose",
    "polandtravel"
  ),
  category: "AMM",
  icon: {
    src: icons.list,
  },
  supports: {},
  attributes: {
    message: {
      type: "array",
      source: "children",
      selector: ".message-body",
    },
    setting: {
      type: "string",
    },
  },
  // Determines what is displayed in the editor
  edit: (props) => {
    const {
      attributes: { setting, message },
      isSelected,
      className,
      setAttributes,
    } = props;

    const onChangeMessage = (e) => {
      setAttributes({ message: e.target.value });
    };

    // Return the markup displayed in the editor
    return [
      isSelected && (
        <InspectorControls key="inspector">
          <PanelBody title={__("Custom headline", "polandtravel")}>
            <RadioControl
              label="Choose Icon"
              selected={setting}
              options={[
                {
                  label: icons.car,
                  value: "car",
                },
                {
                  label: icons.group,
                  value: "group",
                },
              ]}
              onChange={(setting) => setAttributes({ setting })}
            />
          </PanelBody>
        </InspectorControls>
      ),
      <div className={className}>
        {(() => {
          switch (setting) {
            case "car":
              return icons.car;
            case "group":
              return icons.group;
            default:
              return null;
          }
        })()}
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add headline text...")}
          keepPlaceholderOnFocus
          value={message}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          onChange={(value) => setAttributes({ message: value })}
        />
      </div>,
    ];
  },
  // Determines what is displayed on the frontend
  save: (props) => {
    const {
      attributes: { setting, message },
    } = props;

    // Return the markup to display on the frontend
    return (
      <div>
        {(() => {
          switch (setting) {
            case "car":
              return (
                <div class="message-body-blue">
                  {icons.car}
                  <RichText.Content
                    tagName="div"
                    className="custom-headline-text"
                    value={message}
                  />
                </div>
              );
            case "group":
              return (
                <div class="message-body">
                  {icons.group}
                  <RichText.Content
                    tagName="div"
                    className="custom-headline-text"
                    value={message}
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  },
});
