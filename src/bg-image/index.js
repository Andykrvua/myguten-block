import { registerBlockType } from "@wordpress/blocks";
import {
  MediaUpload,
  MediaPlaceholder,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  Toolbar,
  IconButton,
  FocalPointPicker,
  PanelBody,
  PanelRow,
  SelectControl,
  Button,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";

const ALLOWED_BLOCKS = ["amm-custom-block/paragraph-block", "core/paragraph"];

registerBlockType("amm-custom-block/bg-image", {
  title: __("Background Image"),

  description: __("", "create-block"),

  category: "AMM",

  icon: "format-image",

  supports: {
    // Removes support for an HTML mode.
    html: false,
    align: ["left", "wide", "full"],
  },
  attributes: {
    image: {
      type: "object",
    },
    focalPoint: {
      type: "object",
    },
    repeat: {
      type: "string",
      default: "no-repeat",
    },
    size: {
      type: "string",
      default: "auto",
    },
    backgroundColor: {
      type: "string",
      default: "transparent",
    },
  },

  edit({ className, attributes, setAttributes }) {
    const { image, focalPoint, repeat, size, backgroundColor } = attributes;

    const handleImage = (image) => {
      setAttributes({ image });
    };

    const style = {
      backgroundRepeat: repeat,
      backgroundSize: size,
      backgroundColor: backgroundColor,
      backgroundPosition:
        typeof focalPoint != "undefined"
          ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
          : ``,
      backgroundImage: typeof image != "undefined" ? `url(${image.url})` : ``,
    };

    return (
      <div className={className} style={style}>
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
        {!!image && (
          <InspectorControls>
            <PanelBody title={__("Media settings")} initialOpen={true}>
              <FocalPointPicker
                label={__("Background Position")}
                url={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADICAYAAADBXvybAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDMtMDRUMTM6NTk6NDQtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTA0VDE0OjA0OjMxLTA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTA0VDE0OjA0OjMxLTA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBkYTQ5N2Y3LWU0NDUt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"
                }
                value={focalPoint}
                onChange={(newFocalPoint) =>
                  setAttributes({
                    focalPoint: newFocalPoint,
                  })
                }
              />
              <PanelRow>
                <Button
                  isSecondary
                  isSmall
                  className="block-library-backgroundimage__reset-button"
                  onClick={() =>
                    setAttributes({
                      image: undefined,
                      backgroundType: undefined,
                      focalPoint: undefined,
                    })
                  }
                >
                  {__("Clear Media")}
                </Button>
              </PanelRow>
              <SelectControl
                label="Repeat"
                help="If and how this background should repeat."
                value={repeat}
                options={[
                  { label: "Repeat", value: "repeat" },
                  { label: "Repeat Horizontally", value: "repeat-x" },
                  { label: "Repeat Vertically", value: "repeat-y" },
                  { label: "No Repeat", value: "no-repeat" },
                  { label: "Space", value: "space" },
                  { label: "Round", value: "round" },
                ]}
                onChange={(value) => {
                  setAttributes({ repeat: value });
                }}
              />
              <SelectControl
                label="Size"
                help="Background size."
                value={size}
                options={[
                  { label: "Auto", value: "auto" },
                  { label: "Cover", value: "cover" },
                  { label: "Contain", value: "contain" },
                ]}
                onChange={(value) => {
                  setAttributes({ size: value });
                }}
              />
            </PanelBody>
            <PanelBody title={__("Color settings")} isnitialOpen={false}>
              <label className="blocks-base-control__label">
                Background Color
              </label>
              <ColorPalette
                value={backgroundColor}
                onChange={(value) => {
                  setAttributes({ backgroundColor: value });
                }}
              />
            </PanelBody>
          </InspectorControls>
        )}
        {image && image.url ? (
          <div />
        ) : (
          <MediaPlaceholder onSelect={handleImage} />
        )}
        {/* <InnerBlocks /> */}
        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
      </div>
    );
  },

  save({ attributes }) {
    const styleSave = {
      backgroundRepeat: attributes.repeat,
      backgroundSize: attributes.size,
      backgroundImage: `url(${attributes.image.url})`,
      backgroundPosition: attributes.focalPoint
        ? `${attributes.focalPoint.x * 100}% ${attributes.focalPoint.y * 100}%`
        : "",
      backgroundColor: attributes.backgroundColor,
    };

    return (
      <div style={styleSave}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
