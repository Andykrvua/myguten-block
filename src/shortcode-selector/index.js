var el = wp.element.createElement;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
  RichText,
  BlockControls,
  BlockFormatControls,
  AlignmentToolbar,
  InspectorControls,
} = wp.editor;
const {
  Button,
  Dashicon,
  Tooltip,
  IconButton,
  Toolbar,
  PanelBody,
  SelectControl,
} = wp.components;
const { Component, Fragment } = wp.element;

//standard registerBlockType init

registerBlockType("myguten-block/shortcode-selector", {
  title: "Шорткоды", //any title you like
  icon: "universal-access-alt", //any dashicon or svg
  category: "AMM", //which category to appear under

  //schema of attributes
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

  //for adding things like a rich text editor, and controls - the editor
  edit: class extends Component {
    //standard constructor for a component
    constructor() {
      super(...arguments);

      //make sure we bind `this` to the current component within our callbacks
      this.setupEditor = this.setupEditor.bind(this);
      this.onChangeContent = this.onChangeContent.bind(this);
      this.shortcodeSelected = this.shortcodeSelected.bind(this);

      this.state = {
        //we don't need our component to manage a state in this instance
      };
    }

    //get a local reference to the editor on setup
    setupEditor(editor) {
      this.editor = editor;
    }

    //update attributes when content is updated
    onChangeContent(newContent) {
      this.props.setAttributes({ content: newContent });
    }

    shortcodeSelected(value) {
      this.props.setAttributes({ selector: value });
      this.props.setAttributes({ content: value });
    }

    //tinymce interaction when button is clicked
    onClickShortcodeButton() {
      return () => {
        //the content we want to insert
        var myContent = "[myshortcode][/myshortcode]";

        if (this.editor) {
          //execCommand is a TinyMCE function
          this.editor.execCommand("mceInsertContent", false, myContent);
        }
      };
    }

    render() {
      const backgroundColors = [
        { value: "thebutton", label: "Выводит кнопку" },
        { value: "thetitle", label: "Выводит заголовок" },
        { value: "theprice", label: "Выводит стоимость" },
      ];

      const { attributes, setAttributes, className } = this.props;

      //return toolbar and richtext components
      return (
        <Fragment>
          <InspectorControls key="inspector">
            <PanelBody title={__("Настройки заголовка")}>
              <SelectControl
                label={__("Доступные шорткоды")}
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
            //getSettings={ this.getEditorSettings } //a useful callback for adding params to TinyMCE on setup
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

  //save our content to the DB
  save: function (props) {
    //save the content variable
    var content = props.attributes.content;

    return (
      <RichText.Content
        className={props.className}
        value={"[" + content + "]"}
      />
    );
    // el(RichText.Content, {
    //   className: props.className,
    //   value: content,
    // });
  },
});
