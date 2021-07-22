import React, { useState , useEffect } from 'react'; //use  to update dom
import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import {AddTodos} from './MyComponents/AddTodos';
import { About } from "./MyComponents/About";
import {
   BrowserRouter as Router, //router is used to wrap the component
   Switch,
   Route,
   
 } from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"))
  }
  const onDelete=(todo)=>{
    console.log("I am ondelete of todo", todo);
    // deleteing this way in react does not work
    // let index= todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo= (title,desc)=>{
    console.log("I am adding this Todo",title,desc);
    let sn;
    if(todos.length===0){
      sn=0;
    }
    else{
      sn=todos.[todos.length-1].sn+1;
    }
     
    const myTodo={
      sn : sn,
      title:title,
      desc:desc,
    };
    setTodos([...todos,myTodo])
    console.log(myTodo);

    

    
  }
  

  const [todos, setTodos] = useState(/*[  //setTodos is a function which update the todos
    // {sn:1,
    //   title:"goto market",
    //   desc:"bring vegies",
    // },
    // {sn:2,
    // title:"goto school ",
    // desc:"to study",
    // },
    // {sn:3,
    //   title:"goto tution",
    //   desc:"for extra study",
    // },
    
  ]*/ initTodo);

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
    
  }, [todos])

  return (
    
    <>
    <Router>
    <Header title="My Todos List" searchBar={false}/>

    <Switch>
          <Route exact path="/" render={()=>{
            return(
              <>
              <AddTodos addTodo={addTodo}/>
              <Todos todos={todos} onDelete={onDelete}/>
              </>
            )
          }}>
          
          </Route>
          
          <Route exact path="/about">
          <About />
          </Route>
        </Switch>
    
    
    <Footer/>
    </Router>
    
    
    </>
  );
}

export default App;
