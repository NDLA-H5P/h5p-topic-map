import { Image } from "./H5P/Image";
import { Video } from "./H5P/Video";

export type CommonItemType = {
  id: string;

  description?: string;
  topicImage?: Image;

  /** The x position as a percentage of the container's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the container's height */
  yPercentagePosition: number;

  /** The width as a percentage of the container's width */
  widthPercentage: number;

  /** The height as a percentage of the container's height */
  heightPercentage: number;

  dialog?: {
    links?: Array<string>;
    text?: string;
    video?: Video;
  };
};
