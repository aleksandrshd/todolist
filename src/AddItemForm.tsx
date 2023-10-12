import React, {useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void,
};

export type InputEventType = React.ChangeEvent<HTMLInputElement>;

export type KeyboardEventType = React.KeyboardEvent<HTMLInputElement>;

export function AddItemForm(props: AddItemFormPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);

  const changeInput = (e: InputEventType) => {
    setNewTaskTitle(e.currentTarget.value);
    setErrorText(null);
  }

  const addTaskByEnter = (e: KeyboardEventType) => {
    if (e.key === "Enter") {
      addItem();
    }
  }

  const addItem = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
      setErrorText(null);
    } else {
      setErrorText("Enter task title");
    }
  }

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={changeInput}
        onKeyDown={addTaskByEnter}
      />
      <button
        onClick={addItem}
      >+
      </button>
      {errorText && <p>{errorText}</p>}
    </div>
  )
}