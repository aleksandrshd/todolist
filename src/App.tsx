import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskFilterType = "all" | "active" | "completed";

type TodolistType = {
  id: string,
  title: string,
  filter: TaskFilterType
};

type TasksStateType = {
  [key: string]: TaskType[]
};

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn?", filter: "all"},
    {id: todolistId2, title: "What to buy?", filter: "active"},
  ]);

  const initTasks1: Array<TaskType> = [
    {id: v1(), title: "HTML & CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ];

  const initTasks2: Array<TaskType> = [
    {id: v1(), title: "Coffe", isDone: true},
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "Chocolate", isDone: false},
    {id: v1(), title: "Meat", isDone: false},
    {id: v1(), title: "Vegetables", isDone: false},
  ];

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: initTasks1,
    [todolistId2]: initTasks2,
  });

  const addTask = (title: string, todolistId: string) => {
    const newTask =
      {
        id: v1(),
        title: title,
        isDone: false
      };
    tasks[todolistId] = [...tasks[todolistId], newTask];
    setTasks({...tasks});
  }

  const removeTask = (id: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter(task => task.id !== id);
    setTasks({...tasks});
  }

  const changeTaskTitle = (taskId: string, newTitle:string, todolistId: string) => {
    const tasksToChange = tasks[todolistId];
    const taskToChange = tasksToChange.find(task => task.id === taskId);
    if (taskToChange) {
      taskToChange.title = newTitle;
      setTasks({...tasks});
    }
  }

  const changeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {
    const tasksToChange = tasks[todolistId];
    const taskToChange = tasksToChange.find(task => task.id === taskId);
    if (taskToChange) {
      taskToChange.isDone = isDone;
      setTasks({...tasks});
    }
  }

  const setTasksFilter = (option: TaskFilterType, todolistId: string) => {
    const updatedTodolist = todolists.find(todolist =>
      todolist.id === todolistId);
    if (updatedTodolist) {
      updatedTodolist.filter = option;
      setTodolists([...todolists]);
    }
  }

  const addTodolist = (newTodolistTitle: string) => {
    const newTodolist:TodolistType = {
      id: v1(),
      title: newTodolistTitle,
      filter: "all"
    };
    setTodolists([newTodolist, ...todolists]);

    setTasks({[newTodolist.id]:[], ...tasks});
  }

  const removeTodolist = (todolistId: string) => {
    const updatedTodolists = todolists.filter(todolist =>
      todolist.id !== todolistId);
    setTodolists([...updatedTodolists]);

    delete tasks[todolistId];
    setTasks({...tasks});
  }

  const changeTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
    const updatedTodolist = todolists.find(todolist =>
      todolist.id === todolistId);
    if (updatedTodolist) {
      updatedTodolist.title = newTodolistTitle;
      setTodolists([...todolists]);
    }
  }

  return (
    <div className="App">

      <AddItemForm addItem={addTodolist} />

      {todolists.map(todolist => {

        let tasksForTodolist = tasks[todolist.id];

        if (todolist.filter === "active") {
          tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone);
        } else if (todolist.filter === "completed") {
          tasksForTodolist = tasks[todolist.id].filter(task => task.isDone);
        }

        return (
          <Todolist
            key={todolist.id}
            id={todolist.id}
            title={todolist.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            setTasksFilter={setTasksFilter}
            addTask={addTask}
            changeIsDone={changeIsDone}
            changeTaskTitle={changeTaskTitle}
            filter={todolist.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </div>
  );
}

export default App;
