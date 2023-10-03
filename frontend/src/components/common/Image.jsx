// Import the Cloudinary classes.
import React from 'react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import {
//   lazyload,
//   responsive,
//   accessibility,
//   placeholder,
//   HtmlImageLayer,
// } from '@cloudinary/html';

const Image = ({
  imgName,
  w = 'auto',
  h = 'auto',
  ext = 'auto',
  // cropMode = 'fill',
  cornersRadius = 0,
  qualityMode = 'auto',
  gravityMode = 'center',
  placeholderMode = 'blur',
  loadingMode = 'lazy',
}) => {
  const myImage = new CloudinaryImage(imgName, {
    cloudName: 'dmikwphlt',
  })
    .resize(fill().width(w).height(h).gravity(gravityMode))
    .roundCorners(byRadius(cornersRadius))
    .quality(qualityMode)
    .format(ext);

  return (
    <>
      <AdvancedImage
        cldImg={myImage}
        placeholder={placeholderMode}
        loading={loadingMode}
      />
    </>
  );
};

export default Image;
