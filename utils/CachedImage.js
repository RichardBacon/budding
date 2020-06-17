import React, { useState, useEffect } from 'react';
import { FileSystem } from 'expo';
import shorthash from 'shorthash';

function CachedImage({ uri }) {
  const [image, setImage] = useState(null);

  const name = shorthash.unique(uri);
  const path = `${FileSystem.cacheDirectory}${name}`;

  useEffect(() => {
    const newImage = FileSystem.dowloadAsync(uri, path).then((newImage) => {
      console.log(newImage);
      // setImage({ uri: newImage.uri });
    });
  });
}

export default CachedImage;
