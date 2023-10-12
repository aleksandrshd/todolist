import React from "react";
import './Todolist.css';
import {TaskFilterType} from "./App";
import {AddItemForm, InputEventType} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
  changeTaskTitle: (taskId: string, newTitle:string, todolistId: string) => void,
  filter: TaskFilterType,
  removeTodolist: (todolistId: string) => void,
  changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
};

export function Todolist(props: PropsType) {

  const addTask = (title: string) => props.addTask(title, props.id);

  const setAllOption = () => props.setTasksFilter("all", props.id);
  const setActiveOption = () => props.setTasksFilter("active", props.id);
  const setCompletedOption = () => props.setTasksFilter("completed", props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  const changeTodolistTitle = (newTodolistTitle: string) => {
    props.changeTodolistTitle(newTodolistTitle, props.id);
  }

  return (
    <div className="todolist">
      <div className="todolist_header">
        <h2>
          <EditableSpan
            title={props.title}
            onChange={changeTodolistTitle}
          />
        </h2>
        <button
          onClick={removeTodolist}
        >x
        </button>
      </div>
      <AddItemForm addItem={addTask}/>
      <ul>
        {props.tasks.map(task => {

            const removeTask = () => {
              props.removeTask(task.id, props.id);
            }

            const changeIsDone = (e: InputEventType) => {
              props.changeIsDone(task.id, e.currentTarget.checked, props.id);
            }

          const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.id);
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
                <EditableSpan title={task.title} onChange={changeTaskTitle}/>
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

