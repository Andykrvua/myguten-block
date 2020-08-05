import backgroundColors from "./../shortcode-list/index.js";

var el = wp.element.createElement;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;

registerBlockType("amm-custom-block/shortcode-selector", {
  title: "Шорткоды",
  icon: "shield",
  category: "AMM",

  attributes: {
    content: {
      type: "array",
      source: "children",
    },
    selector: {
      type: "string",
      default: "",
    },
  },

  edit: class extends Component {
    constructor() {
      super(...arguments);

      this.setupEditor = this.setupEditor.bind(this);
      this.onChangeContent = this.onChangeContent.bind(this);
      this.shortcodeSelected = this.shortcodeSelected.bind(this);

      this.state = {};
    }

    setupEditor(editor) {
      this.editor = editor;
    }

    onChangeContent(newContent) {
      this.props.setAttributes({ content: newContent });
    }

    shortcodeSelected(value) {
      this.props.setAttributes({ selector: value });
      this.props.setAttributes({ content: value });
    }

    onClickShortcodeButton() {
      return () => {
        var myContent = "[myshortcode][/myshortcode]";

        if (this.editor) {
          this.editor.execCommand("mceInsertContent", false, myContent);
        }
      };
    }

    render() {
      backgroundColors;

      const { attributes, setAttributes, className } = this.props;

      return (
        <Fragment>
          <InspectorControls key="inspector">
            <PanelBody title={__("Настройки шорткодов")}>
              <SelectControl
                label={__("Доступные шорткоды")}
                help={__(
                  "Убедитесь, что код в квадратных скобках [...] если вводите вручную"
                )}
                options={backgroundColors}
                value={attributes.selector}
                onChange={this.shortcodeSelected}
              />
            </PanelBody>
          </InspectorControls>

          <BlockControls
            controls={[
              {
                icon: "edit",
                title: __("Insert Shortcode"),
                onClick: this.onClickShortcodeButton(),
              },
            ]}
          />
          <RichText
            onSetup={this.setupEditor}
            key={"editable"}
            tagName={"p"}
            className={className}
            onChange={this.onChangeContent}
            placeholder="Введите код шорткода или выберите на панели справа"
            value={attributes.content}
          />
        </Fragment>
      );
    }
  },

  save: function (props) {
    var content = props.attributes.content;

    return <RichText.Content className={props.className} value={content} />;
  },
});
