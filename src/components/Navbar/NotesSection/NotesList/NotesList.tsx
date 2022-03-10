import * as React from "react";
import { getUserData } from "../../../../hooks/useLocalStorage";
import { useL10n } from "../../../../hooks/useLocalization";
import { NoteButton } from "../../../NoteButton/NoteButton";
import { NoteButtonIconState } from "../../../../types/NoteButtonIconState";
import { CommonItemType } from "../../../../types/CommonItemType";
import styles from "./NotesList.module.scss";

export type NotesListProps = {
  topicMapItems: CommonItemType[];
  navbarTitle: string;
};

export const NotesList: React.FC<NotesListProps> = ({
  topicMapItems,
  navbarTitle,
}) => {
  const userData = getUserData();
  const noItemsInListText = useL10n("navbarNotesEmptyListLabel");
  const missingNoteText = useL10n("navbarNotesMissingNoteLabel");

  const userDataEntries = topicMapItems.map(item => {
    const doesNoteExist = item.id in userData && userData[item.id].note;
    const isNoteDone = doesNoteExist && userData[item.id].noteDone;

    return (
      item.dialog?.hasNote && (
        <React.Fragment key={item.id}>
          <div className={styles.mainBodyListElementWrapper}>
            <div className={styles.pageBreak} />
            <div className={styles.mainBodyListElement}>
              <div className={styles.mainBodyButton}>
                <NoteButton
                  backgroundColor="var(--theme-color-2)"
                  borderColor="var(--theme-color-3)"
                  iconColor="var(--theme-color-4)"
                  buttonState={
                    doesNoteExist && isNoteDone
                      ? NoteButtonIconState.Done
                      : NoteButtonIconState.Default
                  }
                />
              </div>
              <div className={styles.mainBodyList}>
                <p className={styles.mainBodyListElementHeader}>{item.label}</p>
                <p>
                  {doesNoteExist ? userData[item.id].note : missingNoteText}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  });

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyHeaderForPrint}>
          <p>{navbarTitle}</p>
        </div>
        {userDataEntries || noItemsInListText}
      </div>
    </div>
  );
};
