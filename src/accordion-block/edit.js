const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { Component } = wp.element;
const { PanelBody, ToggleControl } = wp.components;

export default class Edit extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: { title, isOpen },
      setAttributes,
      className,
    } = this.props;

    let classNames = `${className} accordion`;

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Опции отображения")}>
            <ToggleControl
              label={isOpen ? __("Открыт") : __("Закрыт")}
              checked={isOpen}
              onChange={(isOpen) => setAttributes({ isOpen })}
            />
          </PanelBody>
        </InspectorControls>
        <div className={classNames}>
          <RichText
            tagName="div"
            className="accordion__title"
            label={__("Вопрос")}
            value={title}
            placeholder={__("Вопрос")}
            keepPlaceholderOnFocus
            onChange={(title) => setAttributes({ title })}
          />
          <div className="accordion__body">
            <InnerBlocks />
          </div>
        </div>
      </>
    );
  }
}
