const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType("myguten-block/heading-block", {
  title: "Заголовок H2",
  icon: "shield",
  category: "AMM",
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "H2",
    },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const onChangeContent = (newContent) => {
      setAttributes({ content: newContent });
    };
    return (
      <RichText
        tagName="H2"
        className="post-desc__subtitle"
        onChange={onChangeContent}
        value={attributes.content}
        placeholder={"Заголовок..."}
      />
    );
  },

  save: (props) => {
    return (
      <RichText.Content
        className="post-desc__subtitle"
        tagName="H2"
        value={props.attributes.content}
      />
    );
  },
});
