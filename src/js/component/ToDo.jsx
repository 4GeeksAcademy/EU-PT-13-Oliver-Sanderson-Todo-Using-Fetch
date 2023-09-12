import React, { useEffect, useState } from "react";

function ToDo(props) {

    



    const [toDoArr, setToDoArr] = useState(props.tasks)
    const [input, setInput] = useState("")
    const [taskList, setTaskList] = useState(["Loading"])

    useEffect(() => {

            fetch("https://playground.4geeks.com/apis/fake/todos/user/" + props.user)
            .then(response => {
                return response.json();
            })
            .then(data => { 
                setTaskList(data.map((item) => item.label));
            })

        }, [])



    function returnUpdatedTodo () {
        let array = props.tasks.map((item) => {return{"label": item, "done": false}})
        array.unshift({ "label": input, "done": false },)
        return array
    }

    function returnDeletedTodo (idToDelete) {
        let array = props.tasks.filter((item,index) => index != idToDelete)
        array = array.map((item) => {return{"label": item, "done": false}})
        return array
    }

    function addItem () {

        fetch ("https://playground.4geeks.com/apis/fake/todos/user/" + props.user , {
            method: "PUT",
            body: JSON.stringify(
                returnUpdatedTodo()
            ),

            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            console.log(resp);
        })

    }

    function deleteItem (e) {
        console.log(e.target.parentElement.id);
        console.log(props.tasks.filter((item, index) => 
            index != e.target.parentElement.id
            ))
        fetch("https://playground.4geeks.com/apis/fake/todos/user/" + props.user ,{
            method: "PUT",
            body: JSON.stringify(
                returnDeletedTodo(e.target.parentElement.id)
            ),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            console.log(resp);
        })
    }

    const listItems = props.tasks.map((item, index) => 
        <li key={index} id={index} className="d-flex justify-content-between hoverParent">
        <p className="m-2" >{item}</p>
        <button className="btn btn-danger hoverButton" 
        onClick={ deleteItem }
        ><i className="fa-solid fa-x"></i></button>
        </li>
        )
    return (
        <div>
            <h1 className="text-center">To Do List</h1>
            <ul>
                <li className="d-flex">
                     <input className="inputInside"
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                addItem()
                                }
                                }}
                            value={input} placeholder="What needs to be done?"/>
                            <button className="btn btn-primary" onClick={addItem}>Submit</button>
                </li>
                {listItems.length === 0 ? <li><p className="m-2" >No tasks, add a task.</p></li> : listItems}
            </ul>
            {taskList}
        </div>
    )
}

export default ToDo