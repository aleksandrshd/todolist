import React, {useState} from "react";
import './Todolist.css';
import {TaskFilterType} from "./App";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
};

type PropsType = {
  id: string
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  setTasksFilter: (option: TaskFilterType, todolistId: string) => void,
  addTask: (title: string, todolistId: string) => void,
  changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void,
  filter: TaskFilterType,
  removeTodolist: (todolistId: string) => void
};

type InputEventType = React.ChangeEvent<HTMLInputElement>;

type KeyboardEventType = React.KeyboardEvent<HTMLInputElement>;

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);

  const changeInput = (e: InputEventType) => {
    setNewTaskTitle(e.currentTarget.value);
    setErrorText(null);
  }

  const addTaskByEnter = (e: KeyboardEventType) => {
    if (e.ctrlKey && e.key === "Enter") {
      addTask();
    }
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
      setErrorText(null);
    } else {
      setErrorText("Enter task title");
    }
  }

  const setAllOption = () => props.setTasksFilter("all", props.id);
  const setActiveOption = () => props.setTasksFilter("active", props.id);
  const setCompletedOption = () => props.setTasksFilter("completed", props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  return (
    <div className="todolist">
      <div className="todolist_header">
        <h2>{props.title}</h2>
        <button
          onClick={removeTodolist}
        >x
        </button>
      </div>
      <div>
        <input
          value={newTaskTitle}
          onChange={changeInput}
          onKeyDown={addTaskByEnter}
        />
        <button
          onClick={addTask}
        >+
        </button>
      </div>
      {errorText && <p>{errorText}</p>}
      <ul>
        {props.tasks.map(task => {

            const removeTask = () => {
              props.removeTask(task.id, props.id);
            }

            const changeIsDone = (e: InputEventType) => {
              props.changeIsDone(task.id, e.currentTarget.checked, props.id);
            }

            return (
              <li
                className={task.isDone ? "list-item_done" : ""}
                key={task.id}
              >
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeIsDone}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
              </li>
            )
          }
        )
        }
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "filter-btn_active" : ""}
          onClick={setAllOption}
        >All
        </button>
        <button
          className={props.filter === "active" ? "filter-btn_active" : ""}
          onClick={setActiveOption}
        >Active
        </button>
        <button
          className={props.filter === "completed" ? "filter-btn_active" : ""}
          onClick={setCompletedOption}
        >Completed
        </button>
      </div>
    </div>
  )
}