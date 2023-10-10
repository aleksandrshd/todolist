import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskFilterType = "all" | "active" | "completed";

function App() {

  const initTasks: Array<TaskType> = [
    {id: v1(), title: "HTML & CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<TaskFilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState(initTasks);

  useEffect(() => {
    if (filter === "active") {
      const newTasks = tasks.filter(task => !task.isDone);
      setFilteredTasks(newTasks);
    } else if (filter === "completed") {
      const newTasks = tasks.filter(task => task.isDone);
      setFilteredTasks(newTasks);
    } else if (filter === "all") {
      setFilteredTasks(tasks);
    }
  }, [tasks, filter]);

  const addTask = (title: string) => {
    const newTask =
      {
        id: v1(),
        title: title,
        isDone: false
      };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const removeTask = (id: string) => {
    const remainTasks = tasks.filter(task => task.id !== id);
    setTasks(remainTasks);
  }

  const setTasksFilter = (option: TaskFilterType) => {
    setFilter(option);
  }

  const changeIsDone = (taskId: string, isDone: boolean) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn?"
        tasks={filteredTasks}
        removeTask={removeTask}
        setTasksFilter={setTasksFilter}
        addTask={addTask}
        changeIsDone={changeIsDone}
        filter={filter}
      />
    </div>
  );
}

export default App;
