import React from "react";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
};

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: Function
};

export function Todolist(props: PropsType) {
    return (
        <div className="todolist">
            <h2>{props.title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} readOnly={true}/>
                        <span>{task.title}</span>
                        <button onClick={ () => {props.removeTask(task.id)} }>x</button>
                    </li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}