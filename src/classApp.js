import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
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
      ],
      progressTasks: [],
      testingTasks: [],
      completedTasks: [],
      draggedTask: {},
      from: "",
    };
  }

  onDrag = (event, todo, from) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo,
      from: from,
    });
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDropTodo = () => {
    const { draggedTask, todos } = this.state;
    this.setState({
      todos: [...todos, draggedTask],
    });
    this.sliceData();
  };

  onDropProgresh = (event) => {
    const { progressTasks, draggedTask } = this.state;
    this.sliceData();
    this.setState({
      progressTasks: [...progressTasks, draggedTask],
    });
  };

  onDropTesting = (event) => {
    const { testingTasks, draggedTask } = this.state;
    this.sliceData();
    this.setState({
      testingTasks: [...testingTasks, draggedTask],
    });
  };

  onDropComplete = () => {
    const { completedTasks, draggedTask } = this.state;
    this.setState({
      completedTasks: [...completedTasks, draggedTask],
    });
    this.sliceData();
  };

  sliceData() {
    const {
      todos,
      progressTasks,
      testingTasks,
      completedTasks,
      draggedTask,
      from,
    } = this.state;
    if (from == "todo") {
      this.setState({
        todos: todos.filter((task) => task.taskID !== draggedTask.taskID),
      });
    } else if (from == "progress") {
      this.setState({
        progressTasks: progressTasks.filter(
          (task) => task.taskID !== draggedTask.taskID
        ),
      });
    } else if (from == "testing") {
      this.setState({
        testingTasks: testingTasks.filter(
          (task) => task.taskID !== draggedTask.taskID
        ),
      });
    } else if (from == "completed") {
      this.setState({
        completedTasks: completedTasks.filter(
          (task) => task.taskID !== draggedTask.taskID
        ),
        draggedTask: {},
      });
    }
  
  }


  render() {
    const { todos, progressTasks, testingTasks, completedTasks } = this.state;
    return (
      <div className="App">
        <div
          className="done"
          onDrop={(event) => this.onDropTodo(event)}
          onDragOver={(event) => this.onDragOver(event)}
        >
          {todos.map((todo) => (
            <div
              key={todo.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, todo, "todo")}
            >
              {todo.task}
            </div>
          ))}
        </div>
        <div
          onDrop={(event) => this.onDropProgresh(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done"
        >
          {progressTasks.map((task) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "progress")}
            >
              {task.task}
            </div>
          ))}
        </div>

        <div
          onDrop={(event) => this.onDropTesting(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done"
        >
          {testingTasks.map((task, index) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "testing")}
            >
              {task.task}
            </div>
          ))}
        </div>

        <div
          onDrop={(event) => this.onDropComplete(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done"
        >
          {completedTasks.map((task) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "completed")}
            >
              {task.task}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
