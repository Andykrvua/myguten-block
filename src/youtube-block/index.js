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

    const handleLocationIconsChange = (icons, index) => {
      const locations = [...props.attributes.locations];
      locations[index].icons = icons;
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
      // props.setAttributes({ locations });

      // if (!youtubeVideoURLTest.test(youtubeurl)) {
      //   return;
      // }

      // Extract video ID and set embed url, TODO: Change to positive lookbehind when browsersupport gets better
      // would be: const videoID = /(?<=v=)[^&]+/.exec(youtubeURL);
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
          <li key={index} className="lazy-video splide__slide">
            <div className="lazy-video__wrapper">
              {/* <div key={index} className="post-desc__advant-item">
            {(() => {
              return iconset[props.attributes.locations[index].icons];
            })()}
            <span className="post-desc__advant-span">{location.address}</span>
            <span className="post-desc__advant-span"> */}
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
                <svg width="68" height="48" viewBox="0 0 68 48">
                  <path
                    className="lazy-video__button-shape"
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  ></path>
                  <path
                    className="lazy-video__button-icon"
                    d="M 45,24 27,14 27,34"
                  ></path>
                </svg>
              </button>
              {/* </span>
          </div> */}
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
            {/* <div className="post-desc__advant-item" key={index}>
          {(() => {
            return iconset[props.attributes.locations[index].icons];
          })()}
          <span className="post-desc__advant-span">{location.address}</span>
          <span className="post-desc__advant-span"> */}
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
              <svg width="68" height="48" viewBox="0 0 68 48">
                <path
                  className="lazy-video__button-shape"
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                ></path>
                <path
                  className="lazy-video__button-icon"
                  d="M 45,24 27,14 27,34"
                ></path>
              </svg>
            </button>
            {/* </span>
        </div> */}
          </div>
        </li>
      );
    });

    return (
      <div className={props.className + " splide"}>
        <div className="splide__track">
          <ul className="splide__list">
            {/* <div className={props.className + " post-desc__advant-wrap"}> */}
            {locationFields}
          </ul>
        </div>
      </div>
    );
  },
});
