import { useEffect, useState } from "react";
import { Image } from "react-konva";

export const URLImage = ({ x, y, rotation, width, height, src }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
  }, [src]);

  const loadImage = () => {
    let img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
    };
  };
  return (
    <Image
      x={x}
      y={y}
      image={image}
      width={width}
      height={height}
      rotation={rotation}
    />
  );
};
