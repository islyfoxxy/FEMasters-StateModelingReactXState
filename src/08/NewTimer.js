import { useMachine } from "@xstate/react";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import newTimerMachine from "./newTimerMachine";

export default function NewTimer({ onSubmit, onCancel }) {
  const inputRef = useRef();
  const [state, send] = useMachine(newTimerMachine, {
    actions: {
      submit: ({ duration }) => onSubmit(duration)
    }
  });
  const { duration } = state.context;

  const handleSubmit = (event) => {
    event.preventDefault();
    send(event);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <form
      className="screen"
      data-screen="new-timer"
      data-testid="new-timer"
      onSubmit={handleSubmit}
    >
      <input
        type="number"
        min={0}
        step={1}
        placeholder="00s"
        onChange={send}
        title="Duration"
        ref={inputRef}
      />

      <div className="actions">
        {onCancel ? (
          <button
            type="button"
            title="Cancel"
            className="transparent"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          title={`Start ${duration}-second timer`}
          hidden={duration <= 0 || undefined}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </form>
  );
}
