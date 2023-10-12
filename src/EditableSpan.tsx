import React, {useState} from "react";
import {InputEventType, KeyboardEventType} from "./AddItemForm";

type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
};

export function EditableSpan(props: EditableSpanPropsType) {

  const [editableMode, setEditableMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const changeInputValue = (e: InputEventType) => {
    setInputValue(e.currentTarget.value);
  }

  const activateEditMode = () => {
    setEditableMode(true);
    setInputValue(props.title);
  }

  const activateViewMode = () => {
    setEditableMode(false);
    props.onChange(inputValue);
  }

  const setInputValueByEnter = (e: KeyboardEventType) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  }

  return editableMode ? (
      <input
        autoFocus={true}
        value={inputValue}
        onChange={changeInputValue}
        onBlur={activateViewMode}
        onKeyDown={setInputValueByEnter}
      />
  ) : (
    <span
      onDoubleClick={activateEditMode}
    >{props.title}</span>
  )
}