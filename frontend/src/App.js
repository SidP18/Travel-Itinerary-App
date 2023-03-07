import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import { Login } from ".components/Login";
import { Register } from ".components/Register";

function App() {


  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
      const [currentForm, setCurrentForm] = useState('login');

        const toggleForm = (formName) => {
          setCurrentForm(formName);
        }
  return (
    <div className="App">
<div className="container">
<h1> Login </h1>
<div> currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> </div>
  <h2>ToDo App</h2>
  <div className="top">
    <input 
    type="text" 
    placeholder="Add ToDos..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    />

    <div 
    className="add" 
    onClick={ isUpdating ? 
    () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
  : () => addToDo(text, setText, setToDo)}>
      {isUpdating ? "Update" : "Add"}
      </div>
  </div>

  <div className="list">

    {toDo.map((item) => <ToDo 
    key={item._id} 
    text={item.text} 
    updateMode = {() => updateMode(item._id, item.text)}
    deleteToDo = {() => deleteToDo(item._id, setToDo)}/>)}

  </div>
</div>


    </div>
  );
}

export default App;
