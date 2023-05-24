import React, { useState, useRef} from "react";
import "./functionApp.css";
import "./App.css";
// install bootstrap link which is present in index file.

export default function App() {
  const [todos, setTodos] = useState([
    {
      taskID: 1,
      task: "Walk the walk",
    },
    {
      taskID: 2,
      task: "Talk the talk",
    },
    {
      taskID: 3,
      task: "Jump the jump",
    },
  ]);
  const [progressTasks, setProgressTasks] = useState([]);
  const [testingTasks, setTestingTask] = useState([]);
  const [completedTasks, setCompletedTask] = useState([]);
  const [draggedTask, setDraggedTask] = useState({});
  const [from, setForm] = useState("");
  const todoRef = useRef();
  const progressRef = useRef();
  const testRef = useRef();
  const completeRef = useRef();

  const onDrag = (event, todo, from) => {
    event.preventDefault();
    setDraggedTask(todo);
    setForm(from);
    // ref.current.style.backgroundColor= "red";
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDropTodo = () => {
    todoRef.current.style.backgroundColor = "#9999CC";
    todoRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      todoRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    setTodos([...todos, draggedTask]);
    sliceData();
  };

  const onDropProgresh = () => {
    progressRef.current.style.backgroundColor = "#9999CC";
    progressRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      progressRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    setProgressTasks([...progressTasks, draggedTask]);
    sliceData();
  };

  const onDropTesting = () => {
    testRef.current.style.backgroundColor = "#9999CC";
    testRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      testRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    setTestingTask([...testingTasks, draggedTask]);
    sliceData();
  };

  const onDropComplete = () => {
    completeRef.current.style.backgroundColor = "#9999CC";
    completeRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      completeRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    setCompletedTask([...completedTasks, draggedTask]);
    sliceData();
  };

  const sliceData = () => {
    if (from == "todo") {
      setTodos((todos) =>
        todos.filter((task) => task.taskID != draggedTask?.taskID)
      );
    } else if (from == "progress") {
      setProgressTasks((progressTasks) =>
        progressTasks?.filter((task) => task.taskID != draggedTask?.taskID)
      );
    } else if (from == "testing") {
      setTestingTask((testingTasks) =>
        testingTasks?.filter((task) => task.taskID != draggedTask?.taskID)
      );
    } else if (from == "completed") {
      setCompletedTask((completedTasks) =>
        completedTasks?.filter((task) => task.taskID != draggedTask?.taskID)
      );
      setDraggedTask({});
    }
  };


  return (
    <div>
      <div className="taskAllBox">
        <div className="Taskbox rounded-bottom">
          <h2 className="bg-primary bg-gradient mb-0 py-2 text-center rounded-top">
            Todo List
          </h2>
          <div
            ref={todoRef}
            className="done rounded-bottom todoListBox"
            onDrop={(event) => onDropTodo(event)}
            onDragOver={(event) => onDragOver(event)}
          >
            {todos?.map((todo) => (
              <div
                key={todo.taskID}
                draggable
                onDrag={(event) => onDrag(event, todo, "todo")}
                className="todoList"
              >
                {todo.task}
              </div>
            ))}
          </div>
        </div>
        <div className="Taskbox rounded-bottom ">
          <h2 className="bg-warning bg-gradient mb-0 py-2 text-center rounded-top">
            Progress
          </h2>
          <div
            ref={progressRef}
            onDrop={(event) => onDropProgresh(event)}
            onDragOver={(event) => onDragOver(event)}
            className="done rounded-bottom progressListBox"
          >
            {progressTasks.map((task) => (
              <div
                key={task.taskID}
                draggable
                onDrag={(event) => onDrag(event, task, "progress")}
                className="progressList"
              >
                {task.task}
              </div>
            ))}
          </div>
        </div>
        <div className="Taskbox rounded-bottom">
          <h2 className="bg-info bg-gradient mb-0 py-2 text-center rounded-top">
            Testing
          </h2>
          <div
            ref={testRef}
            onDrop={(event) => onDropTesting(event)}
            onDragOver={(event) => onDragOver(event)}
            className="done rounded-bottom testListBox"
          >
            {testingTasks.map((task) => (
              <div
                key={task.taskID}
                draggable
                onDrag={(event) => onDrag(event, task, "testing")}
                className="testList"
              >
                {task.task}
              </div>
            ))}
          </div>
        </div>
        <div className="Taskbox rounded-bottom">
          <h2 className="bg-success bg-gradient mb-0 py-2 text-center rounded-top">
            Completed
          </h2>
          <div
            ref={completeRef}
            onDrop={(event) => onDropComplete(event)}
            onDragOver={(event) => onDragOver(event)}
            className="done rounded-bottom completedListBox"
          >
            {completedTasks.map((task) => (
              <div
                key={task.taskID}
                draggable
                onDrag={(event) => onDrag(event, task, "completed")}
                className="completedList"
              >
                {task.task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
