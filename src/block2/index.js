const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { Button } = wp.components;
const { InnerBlocks } = wp.editor;

const ALLOWED_BLOCKS = ["myguten-block/paragraph-block"];

registerBlockType("myguten-block/block2", {
  title: __("Image Block"),
  icon: "format-image",
  category: "common",
  attributes: {
    mediaID: {
      type: "number",
    },
    mediaAlt: {
      type: "string",
    },
    mediaURL: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "src",
    },
  },

  edit: function (props) {
    const { attributes } = props;

    const onSelectImage = (media) => {
      console.log(media);

      props.setAttributes({
        mediaURL: media.sizes.thumbnail.url,
        mediaID: media.id,
        mediaAlt: media.alt,
      });
    };

    return (
      <div className={props.className + " nl-story-2-col"}>
        <div>
          <MediaUpload
            onSelect={onSelectImage}
            type="image"
            value={attributes.mediaID}
            render={({ open }) => (
              <Button
                className={
                  attributes.mediaID ? "image-button" : "button button-large"
                }
                onClick={open}
              >
                {!attributes.mediaID ? (
                  __("Upload Image")
                ) : (
                  <img src={attributes.mediaURL} />
                )}
              </Button>
            )}
          />
        </div>
        <div>
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
        </div>
      </div>
    );
  },

  save: function (props) {
    return (
      <figure className="nl-story-2-col">
        <div class="nl-story-visual">
          <img
            src={props.attributes.mediaURL}
            alt={props.attributes.mediaAlt}
          />
        </div>
        <figcaption class="nl-story-caption">
          <InnerBlocks.Content />
        </figcaption>
      </figure>
    );
  },
});
