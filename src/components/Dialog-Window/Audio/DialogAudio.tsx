/* eslint-disable jsx-a11y/media-has-caption */
import type { Audio } from "h5p-types";
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogAudio.module.scss";

export type DialogAudioProps = {
  audioTrack: Audio;
  subtext?: string;
};

export const DialogAudio: React.FC<DialogAudioProps> = ({
  audioTrack,
  subtext,
}) => {
  const copyrightTitle = useL10n("copyrightAudio");

  return (
    <>
      <audio className={styles.audioPlayer} src={audioTrack.path} controls />

      {audioTrack.copyright ? (
        <p
          className={styles.copyright}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: formatCopyright(copyrightTitle, audioTrack.copyright),
          }}
        />
      ) : null}

      {subtext ? (
        <div
          className={styles.subtext}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: subtext }}
        />
      ) : null}
    </>
  );
};
