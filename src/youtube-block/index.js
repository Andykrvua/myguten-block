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
        youtubeurl: "url",
        videoID: "videoID",
        imgQual: "default",
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

    const handleimgQualOptionsChange = (imgQual, index) => {
      const locations = [...props.attributes.locations];
      locations[index].imgQual = imgQual;
      props.setAttributes({ locations });
    };

    const youtubeVideoURLTest = new RegExp(
      /^(http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9&=]+$/
    );

    const validateAndChangeURL = (youtubeurl, index) => {
      const locations = [...props.attributes.locations];
      locations[index].youtubeurl = youtubeurl;
      let videoID;
      const parts = youtubeurl.split("v=") || youtubeurl;
      if (parts[1]) {
        if (parts[1].includes("&")) {
          const moreParts = parts[1].split("&");
          videoID = moreParts[0];
        } else {
          videoID = parts[1] || youtubeurl;
        }
      } else {
        videoID = youtubeurl;
      }

      locations[index].videoID = videoID;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;
    let iconsSelectOptions = [];
    const imgQualOptions = [
      { value: "default", label: __("default 120*90") },
      { value: "maxresdefault", label: __("max 1280*720") },
      { value: "hqdefault", label: __("hq 480*360") },
      { value: "mqdefault", label: __("mq 320*180") },
      { value: "sddefault", label: __("sd 640*480") },
    ];

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
            <SelectControl
              className="icons-block__select"
              label="Качество изображения"
              value={props.attributes.locations[index].imgQual}
              options={imgQualOptions}
              onChange={(imgQual) => handleimgQualOptionsChange(imgQual, index)}
            />
            <TextareaControl
              placeholder="Описание блока"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
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
          <li key={index} className="lazy-video splide__slide">
            <div className="lazy-video__wrapper">
              <a className="lazy-video__link" href={location.youtubeurl}>
                <picture>
                  <source
                    srcSet={`https://i.ytimg.com/vi_webp/${location.videoID}/${location.imgQual}.webp`}
                    type="image/webp"
                  />
                  <img
                    className="lazy-video__media"
                    data-videoid={location.videoID}
                    src={`https://i.ytimg.com/vi/${location.videoID}/${location.imgQual}.jpg`}
                    alt=""
                  />
                </picture>
              </a>
              <button
                className="lazy-video__button"
                aria-label="Запустить видео"
              >
                {iconset.yt}
              </button>
            </div>
          </li>
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
      <div key="2" className={props.className + " splide"}>
        <div className="splide__track">
          <ul className="splide__list">{locationDisplay}</ul>
        </div>
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <li key={index} className="lazy-video splide__slide">
          <div className="lazy-video__wrapper">
            <a className="lazy-video__link" href={location.youtubeurl}>
              <picture>
                <source
                  srcSet={`https://i.ytimg.com/vi_webp/${location.videoID}/${location.imgQual}.webp`}
                  type="image/webp"
                />
                <img
                  className="lazy-video__media"
                  data-videoid={location.videoID}
                  src={`https://i.ytimg.com/vi/${location.videoID}/${location.imgQual}.jpg`}
                  alt=""
                />
              </picture>
            </a>
            <button className="lazy-video__button" aria-label="Запустить видео">
              {iconset.yt}
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className={props.className + " splide"}>
        <div className="splide__track">
          <ul className="splide__list">{locationFields}</ul>
        </div>
      </div>
    );
  },
});
