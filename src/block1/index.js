const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType("myguten-block/test-block", {
  title: "My block",
  icon: "smiley",
  category: "AMM",
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "p",
    },
  },
  edit: (props) => {
    console.log("edit-props", props);
    const { attributes, setAttributes } = props;
    const onChangeContent = (newContent) => {
      setAttributes({ content: newContent });
    };
    return (
      <RichText
        tagName="p"
        onChange={onChangeContent}
        value={attributes.content}
      />
    );
  },

  save: (props) => {
    console.log("save-method-props ", props);
    return <RichText.Content tagName="p" value={props.attributes.content} />;
  },
});
