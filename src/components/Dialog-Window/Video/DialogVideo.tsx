/* eslint-disable jsx-a11y/media-has-caption */
import type { Video } from "h5p-types";
import * as React from "react";
import { H5P } from "../../../h5p/H5P.util";
import { useContentId } from "../../../hooks/useContentId";
import { useL10n } from "../../../hooks/useLocalization";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogVideo.module.scss";

export type DialogVideoProps = {
  sources: Array<Video>;
};

export const DialogVideo: React.FC<DialogVideoProps> = ({ sources }) => {
  const contentId = useContentId();
  const copyrightTitle = useL10n("copyrightVideo");
  const videoWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!videoWrapperRef.current) {
      return;
    }

    const $wrapper: JQuery = H5P.jQuery(videoWrapperRef.current);
    const videoLibraryName = "H5P.Video 1.6";

    H5P.newRunnable(
      {
        library: videoLibraryName,
        params: {
          sources: [sources[0]],
          visuals: {
            controls: true,
          },
        },
      },
      contentId,
      $wrapper,
    );
  }, [contentId, sources]);

  return (
    <div className={styles.dialogVideo}>
      <div className={styles.videoWrapper} ref={videoWrapperRef} />

      {sources[0]?.copyright ? (
        <p
          className={styles.copyright}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: formatCopyright(copyrightTitle, sources[0].copyright),
          }}
        />
      ) : null}
    </div>
  );
};
