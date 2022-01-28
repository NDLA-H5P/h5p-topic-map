import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  maxLength: number;
  id: string;
};

export const Note: React.FC<NoteProps> = ({ maxLength, id }) => {
  const [userData, setUserData] = useLocalStorage(id);
  const [note, setNote] = React.useState(userData[id].note ?? "");
  const [dynamicSavingText, setDynamicSavingText] = React.useState("");
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteCompleted, setMarkedAsCompleted] = React.useState<boolean>(
    userData[id].noteCompleted ?? false,
  );
  const [wordCount, setWordCount] = React.useState(0);
  const [maxWordCount, setMaxWordCount] = React.useState<number | undefined>();

  const savingTextLabel = useL10n("dialogNoteSaving");
  const savedTextLabel = useL10n("dialogNoteSaved");
  const completedTextLabel = useL10n("dialogNoteMarkAsCompleted");
  const placeholderText = useL10n("dialogNotePlaceholder");
  const wordTextLabel = useL10n("dialogWordsLabel");

  const handleNoteCompleted = (): void => {
    setMarkedAsCompleted(!noteCompleted);
    userData[id].noteCompleted = noteCompleted;
  };

  const setSavingText = (): void => {
    setDynamicSavingText(savingTextLabel);
    setSavingTextTimeout(
      window.setTimeout(() => {
        const timestamp = new Date();
        const localTime = timestamp.toLocaleTimeString(
          window.navigator.language,
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        );
        setDynamicSavingText(`${savedTextLabel} ${localTime}`);
      }, 650),
    );
  };

  const countWords = (): void => {
    const count = note.split(/\s/).filter(word => word.length > 0).length;
    setWordCount(count);

    if (count === maxLength && note[note.length - 1] === " ") {
      setMaxWordCount(count);
    } else {
      setMaxWordCount(undefined);
    }
  };

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    userData[id].note = note;
    setUserData(userData);
    countWords();
    // ensure there's no memory leak on component unmount during timeout
    return () => {
      if (savingTextTimeout != null) clearTimeout(savingTextTimeout);
    };
  }, [userData, id, note, setUserData, savingTextTimeout]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
  };

  return (
    <form>
      <label htmlFor="note">
        <textarea
          className={styles.textArea}
          id="note"
          placeholder={placeholderText}
          maxLength={maxWordCount}
          onChange={event => onChange(event)}
          defaultValue={note}
        />
        <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
        <div className={styles.markAsCompletedCheckbox}>
          <label htmlFor="note-completed-checkbox">
            <input
              id="note-completed-checkbox"
              type="checkbox"
              checked={noteCompleted}
              onChange={handleNoteCompleted}
            />
            {completedTextLabel}
          </label>
        </div>
        <p data-testid="wordCount" className={styles.wordCounter}>
          {wordCount} / {maxLength} {wordTextLabel}
        </p>
      </label>
    </form>
  );
};
