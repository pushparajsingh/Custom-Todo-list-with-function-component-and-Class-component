import React, { Component, createRef } from "react";
import "./functionApp.css"
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
    const todoRef = createRef()
    const progressRef = createRef()
    const testRef = createRef()
    const completeRef = createRef()
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
    this.todoRef.current.style.backgroundColor = "#9999CC";
    this.todoRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      this.todoRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    const { draggedTask, todos } = this.state;
    this.setState({
      todos: [...todos, draggedTask],
    });
    this.sliceData();
  };

  onDropProgresh = (event) => {
    this.progressRef.current.style.backgroundColor = "#9999CC";
    this.progressRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      this.progressRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    const { progressTasks, draggedTask } = this.state;
    this.sliceData();
    this.setState({
      progressTasks: [...progressTasks, draggedTask],
    });
  };

  onDropTesting = (event) => {
    this.testRef.current.style.backgroundColor = "#9999CC";
    this.testRef.current.style.transition = "all 0.8s";
    const { testingTasks, draggedTask } = this.state;
    setTimeout(() => {
      this.testRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
    this.sliceData();
    this.setState({
      testingTasks: [...testingTasks, draggedTask],
    });
  };

  onDropComplete = () => {
    this.completeRef.current.style.backgroundColor = "#9999CC";
    this.completeRef.current.style.transition = "all 0.8s";
    setTimeout(() => {
      this.completeRef.current.style.backgroundColor = "rgb(147, 145, 145)";
    }, 800);
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
      <div className="taskAllBox">
      <div className="Taskbox rounded-bottom">
      <h2 className="bg-primary bg-gradient mb-0 py-2 text-center rounded-top">
            Todo List
          </h2>
        <div
          ref={this.todoRef}
          className="done rounded-bottom todoListBox"
          onDrop={(event) => this.onDropTodo(event)}
          onDragOver={(event) => this.onDragOver(event)}
        >
          {todos.map((todo) => (
            <div
              key={todo.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, todo, "todo")}
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
          ref={this.progressRef}
          onDrop={(event) => this.onDropProgresh(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done rounded-bottom progressListBox"
          >
          {progressTasks.map((task) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "progress")}
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
                    ref={this.testRef}

          onDrop={(event) => this.onDropTesting(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done rounded-bottom testListBox"
          >
          {testingTasks.map((task, index) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "testing")}
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
                    ref={this.completeRef}

          onDrop={(event) => this.onDropComplete(event)}
          onDragOver={(event) => this.onDragOver(event)}
          className="done rounded-bottom completedListBox"
          >
          {completedTasks.map((task) => (
            <div
              key={task.taskID}
              draggable
              onDrag={(event) => this.onDrag(event, task, "completed")}
              className="completedList"

            >
              {task.task}
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
