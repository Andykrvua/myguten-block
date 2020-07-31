import iconset from "./icons.js";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  Button,
  IconButton,
  PanelBody,
  TextControl,
  RadioControl,
  SelectControl,
  TextareaControl,
} = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("amm-custom-block/youtube-block", {
  title: __("Youtube слайдер"),
  icon: "shield",
  category: "AMM",
  attributes: {
    locations: {
      type: "array",
      default: [],
    },
  },

  edit: (props) => {
    const handleAddLocation = () => {
      const locations = [...props.attributes.locations];
      locations.push({
        address: "Описание блока",
        icons: "car",
        youtubeurl: "url",
        videoID: "videoID",
      });
      props.setAttributes({ locations });
    };

    const handleRemoveLocation = (index) => {
      const locations = [...props.attributes.locations];
      locations.splice(index, 1);
      props.setAttributes({ locations });
    };

    const handleLocationChange = (address, index) => {
      const locations = [...props.attributes.locations];
      locations[index].address = address;
      props.setAttributes({ locations });
    };

    const handleLocationIconsChange = (icons, index) => {
      const locations = [...props.attributes.locations];
      locations[index].icons = icons;
      props.setAttributes({ locations });
    };

    const youtubeVideoURLTest = new RegExp(
      /^(http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9&=]+$/
    );

    const validateAndChangeURL = (youtubeurl, index) => {
      const locations = [...props.attributes.locations];
      locations[index].youtubeurl = youtubeurl;

      if (!youtubeVideoURLTest.test(youtubeurl)) {
        return;
      }

      // Extract video ID and set embed url, TODO: Change to positive lookbehind when browsersupport gets better
      // would be: const videoID = /(?<=v=)[^&]+/.exec(youtubeURL);
      let videoID;
      const parts = youtubeurl.split("v=");
      if (parts[1].includes("&")) {
        const moreParts = parts[1].split("&");
        videoID = moreParts[0];
      } else {
        videoID = parts[1];
      }

      locations[index].videoID = videoID;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;
    let iconsSelectOptions = [];

    Object.keys(iconset).forEach(function (key) {
      iconsSelectOptions.push({ value: key, label: key });
    });

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextControl
              label={__("Youtube video link")}
              help={__(
                "Youtube video link or embed link. allowed format is [https://www.youtube.com/watch?v=video_id].",
                "lazy-youtube"
              )}
              value={props.attributes.locations[index].youtubeurl}
              onChange={(youtubeurl) => validateAndChangeURL(youtubeurl, index)}
            />
            <TextareaControl
              placeholder="Описание блока"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
            <SelectControl
              className="icons-block__select"
              label="Выберите иконку"
              value={props.attributes.locations[index].icons}
              options={iconsSelectOptions}
              onChange={(icons) => handleLocationIconsChange(icons, index)}
            />
            <IconButton
              className="icons-block__remove-item"
              icon="no-alt"
              label="Delete icon block"
              onClick={() => handleRemoveLocation(index)}
            />
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return (
          <div key={index} className="post-desc__advant-item">
            {(() => {
              return iconset[props.attributes.locations[index].icons];
            })()}
            <span className="post-desc__advant-span">{location.address}</span>
          </div>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Иконки")}>
          {locationFields}
          <Button isDefault onClick={handleAddLocation.bind(this)}>
            {__("Add Icon block")}
          </Button>
        </PanelBody>
      </InspectorControls>,
      <span>Блок иконок</span>,
      <div key="2" className={props.className}>
        {locationDisplay}
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <div className="post-desc__advant-item" key={index}>
          {(() => {
            return iconset[props.attributes.locations[index].icons];
          })()}
          <span className="post-desc__advant-span">{location.address}</span>
        </div>
      );
    });

    return (
      <div className={props.className + " post-desc__advant-wrap"}>
        {locationFields}
      </div>
    );
  },
});
