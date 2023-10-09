import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const initTasks: Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ];

    const [tasks, setTasks] = useState(initTasks);

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

  return (
    <div className="App">
      <Todolist
          title="What to learn?"
          tasks={tasks}
          removeTask={removeTask}
      />
    </div>
  );
}

export default App;
