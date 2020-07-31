const { registerBlockType } = wp.blocks;
const {
  MediaUpload,
  MediaPlaceholder,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  ColorPalette,
  RichText,
} = wp.editor;
const {
  Toolbar,
  IconButton,
  PanelBody,
  PanelRow,
  SelectControl,
  Button,
  TextareaControl,
} = wp.components;

const { __ } = wp.i18n;

const ALLOWED_BLOCKS = ["amm-custom-block/paragraph-block", "core/paragraph"];

registerBlockType("amm-custom-block/callback-block", {
  title: __("Callback form"),
  category: "AMM",
  icon: "shield",
  supports: {
    html: false,
    align: ["left", "wide", "full"],
  },
  attributes: {
    image: {
      type: "object",
    },
    title: {
      type: "string",
      default: "ХОТИТЕ УЗНАТЬ БОЛЬШЕ О...",
    },
  },

  edit({ className, attributes, setAttributes }) {
    const { image, title } = attributes;

    const handleImage = (image) => {
      setAttributes({ image });
    };

    const style = {
      backgroundImage: typeof image != "undefined" ? `url(${image.url})` : ``,
    };

    return (
      <>
        <div className={className + " callback-form-editor"} style={style}>
          <BlockControls>
            <Toolbar>
              <MediaUpload
                onSelect={handleImage}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <IconButton
                    className="components-toolbar__control"
                    label={__("Edit media")}
                    icon="edit"
                    onClick={open}
                  />
                )}
              />
            </Toolbar>
          </BlockControls>
          {
            <InspectorControls>
              <PanelBody title={__("Media settings")} initialOpen={true}>
                {!!image && (
                  <PanelRow>
                    <Button
                      isSecondary
                      isSmall
                      className="block-library-backgroundimage__reset-button"
                      onClick={() =>
                        setAttributes({
                          image: undefined,
                          backgroundType: undefined,
                        })
                      }
                    >
                      {__("Сменить изображение")}
                    </Button>
                  </PanelRow>
                )}
                <PanelRow>
                  <TextareaControl
                    placeholder="Описание блока"
                    value={title}
                    onChange={(title) => setAttributes({ title })}
                  />
                </PanelRow>
              </PanelBody>
            </InspectorControls>
          }
          {image && image.url ? (
            <div />
          ) : (
            <MediaPlaceholder onSelect={handleImage} />
          )}
        </div>
        <div>{title}</div>
      </>
    );
  },

  save({ attributes, className }) {
    const styleSave = {
      backgroundImage: `url(${attributes.image.url})`,
    };

    const { image, title } = attributes;

    return (
      <div className={className + " post-desc__form-wrap"} style={styleSave}>
        <div className="container">
          <div className="row mar-bot0">
            <div className="section__title post-desc__white-sect-title">
              {title}
            </div>
            <p className="post-desc__phone__form-text">{"[theformlang]"}</p>
            {"[theformfield]"}
          </div>
        </div>
      </div>
    );
  },
});
