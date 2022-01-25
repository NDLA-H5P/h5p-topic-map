import { ColorTheme } from "../ColorTheme";
import { Image } from "../Image";
import { TopicMapItemType } from "../TopicMapItemType";

export type Params = {
  behaviour?: unknown;

  topicMap?: {
    topicMapItems?: Array<TopicMapItemType> | undefined;
    appearance?: {
      backgroundImage?: Image;
      colorTheme?: ColorTheme;
    };
  };
};
