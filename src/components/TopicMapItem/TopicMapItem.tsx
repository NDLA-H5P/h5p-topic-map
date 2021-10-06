import * as React from "react";
import type { Image } from "../../types/Image";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  backgroundImage: Image | undefined;
  title: string;
  editAction: React.MouseEventHandler;
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({
  backgroundImage,
  title,
  editAction,
}) => {
  return (
    <button type="button" className={styles.topicMapItem} onClick={editAction}>
      {backgroundImage && (
        <img
          className={styles.bgImage}
          src={backgroundImage.path}
          alt={backgroundImage.alt}
        />
      )}
      <div className={styles.title}>{title}</div>
    </button>
  );
};
