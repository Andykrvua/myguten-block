const { RichText, InnerBlocks } = wp.blockEditor;
const { Component } = wp.element;

export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: { title, isOpen },
    } = this.props;

    return (
      <details className="accordion" {...(isOpen && { open: true })}>
        <summary className="accordion__title">
          <RichText.Content tagName="" value={title} />
          <button className="accordion-svg">
            <svg
              className="accordion-toggle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"></path>
            </svg>
          </button>
        </summary>
        <div className="accordion__body">
          <InnerBlocks.Content />
        </div>
      </details>
    );
  }
}
