// Import the Cloudinary classes.
import React from 'react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { CloudinaryVideo } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

const Video = ({
  vidName,
  w = 'auto',
  h = 'auto',
  ext = 'auto',
  cropMode = 'fill',
  cornersRadius = 0,
  qualityMode = 'auto',
  gravityMode = 'center',
  controlsBool = true,
  loopBool = false,
  mutedBool = true,
  playsInlineBool = false,
}) => {
  const myVideo = new CloudinaryVideo(vidName, {
    cloudName: 'dmikwphlt',
  })
    .resize(fill().width(w).height(h).gravity(gravityMode))
    .roundCorners(byRadius(cornersRadius))
    .quality(qualityMode)
    .format(ext);

  return (
    <>
      <AdvancedVideo
        cldVid={myVideo}
        controls={controlsBool}
        width={w}
        height={h}
        loop={loopBool}
        muted={mutedBool}
        playsInline={playsInlineBool}
        poster={{
          source: {
            cldImage: {
              publicId: `${vidName}.${ext === 'auto' ? 'jpg' : ext}`,
              cloudName: 'dmikwphlt',
              transforms: [
                {
                  crop: cropMode,
                },
              ],
            },
          },
        }}
      />
    </>
  );
};

export default Video;
