/**
 * @param {{ youtubeIcon: string }} assets - Assets from script localization youtubeIcon is the path to the youtube icon svg
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, TextControl } = wp.components;

registerBlockType("amm-custom-block/youtube-block-old", {
  title: __("Lazy youtube old"),
  icon: "shield",
  category: "AMM",
  example: {
    attributes: {
      youtubeURL: "https://www.youtube.com/watch?v=NpEaa2P7qZI",
      videoID: "NpEaa2P7qZI",
    },
  },
  attributes: {
    youtubeURL: {
      type: "string",
    },
    videoID: {
      type: "string",
    },
  },
  edit({ attributes, setAttributes }) {
    const { youtubeURL } = attributes;

    const youtubeVideoURLTest = new RegExp(
      /^(http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9&=]+$/
    );

    const validateAndChangeURL = (youtubeURL) => {
      setAttributes({ youtubeURL });

      if (!youtubeVideoURLTest.test(youtubeURL)) {
        return;
      }

      // Extract video ID and set embed url, TODO: Change to positive lookbehind when browsersupport gets better
      // would be: const videoID = /(?<=v=)[^&]+/.exec(youtubeURL);
      let videoID;
      const parts = youtubeURL.split("v=");
      if (parts[1].includes("&")) {
        const moreParts = parts[1].split("&");
        videoID = moreParts[0];
      } else {
        videoID = parts[1];
      }
      setAttributes({ videoID });
    };

    return (
      <div>
        <InspectorControls>
          <PanelBody title={__("Youtube embed options", "lazy-youtube")}>
            <TextControl
              label={__("Youtube video link", "lazy-youtube")}
              help={__(
                "Youtube video link or embed link. allowed format is [https://www.youtube.com/watch?v=video_id].",
                "lazy-youtube"
              )}
              value={youtubeURL}
              onChange={validateAndChangeURL}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks template={[["core/image", {}]]} templateLock={true} />
        {/* Center image and change to a red color with the filter */}
        <img
          className="youtube-play-icon"
          style={{
            width: "6rem",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            filter: "invert(10%) sepia(99%) saturate(10000%) hue-rotate(0deg)",
          }}
          // src={assets["youtubeIcon"]}
          src="+"
        />
      </div>
    );
  },
  save({ attributes }) {
    const { videoID } = attributes;

    return (
      <div>
        <div
          className="w-embed-banner position-relative"
          id={videoID}
          onclick={`loadEmbed${videoID}(this);`}
        >
          <InnerBlocks.Content />
          {/* Center image and change to a red color with the filter */}
          <img
            className="youtube-play-icon"
            style={{
              width: "6rem",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter:
                "invert(10%) sepia(99%) saturate(10000%) hue-rotate(0deg)",
            }}
            // src={assets["youtubeIcon"]}
            src="+"
          />
        </div>
        <script>
          {
            // Construct onclick function for front-end
            `function loadEmbed${videoID}(e) {
						var wrapper = e.parentElement;
						var width = e.clientWidth;
						var height = e.clientHeight;
                        wrapper.removeChild(e);
						var video = document.createElement("iframe");
						video.width = width;
						video.height = height;
                        video.src = "https://www.youtube.com/embed/${videoID}?autoplay=1";
                        wrapper.appendChild(video);
                    }`
          }
        </script>
      </div>
    );
  },
});
