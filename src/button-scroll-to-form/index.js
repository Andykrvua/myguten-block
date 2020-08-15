const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType("amm-custom-block/button-scroll-to-form", {
  title: "Кнопка скрола к форме",
  icon: "shield",
  category: "AMM",

  attributes: {
    content: {
      type: "string",
      source: "text",
    },
  },

  edit: function (props) {
    const { setAttributes, attributes } = props;

    function onChangeContent(newContent) {
      setAttributes({ content: newContent });
    }

    function defValue() {
      console.log("Вывод", props.attributes.content);
      props.attributes.content == undefined
        ? setAttributes({ content: "Просчитать стоимость" })
        : null;
    }

    defValue();

    return (
      <div className="custom_post_button post_inside_button">
        <RichText
          key={"editable"}
          tagName={"button"}
          className={"waves-effect waves-light main__button"}
          onChange={onChangeContent}
          value={attributes.content}
        />
      </div>
    );
  },

  save: function (props) {
    var content = props.attributes.content;
    return (
      <div className="custom_post_button post_inside_button">
        <RichText.Content
          className={"waves-effect waves-light main__button"}
          tagName={"button"}
          value={content}
        />
      </div>
    );
  },
});
