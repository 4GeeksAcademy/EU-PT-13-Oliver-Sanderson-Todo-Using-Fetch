import React, { useState, useEffect } from "react";

function ToDo(props) {

    const [toDoArr, setToDoArr] = useState(props.tasks)
    const [input, setInput] = useState("")

    useEffect(() => {
        primaryFetch()
    }, [])

    function primaryFetch () {
        console.log("primary fetch ran")
        fetch(props.url + props.user)
        .then(response => {
            return response.json();
        })
        .then(data => { 
            setToDoArr(data.map((item) => item.label));
        })
    }

    function returnUpdatedTodo () {
        let array = toDoArr.map((item) => {return{"label": item, "done": false}})
        array.unshift({ "label": input, "done": false },)
        return array
    }

    function returnDeletedTodo (idToDelete) {
        let array = toDoArr.filter((item,index) => index != idToDelete)
        array = array.map((item) => {return{"label": item, "done": false}})
        return array
    }

    function addItem () {
        if(input.trim() === "") {
            alert("Input cannot be empty")
        } else {
            fetch (props.url + props.user , {
                method: "PUT",
                body: JSON.stringify(
                    returnUpdatedTodo()
                ),
    
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(resp => {
                return resp.json()
            }).then(data =>{
                console.log("Add item returned data")
                console.log(data) // this returns the message about it being updated... need to do another fetch
                primaryFetch()
            }).then(setInput(""))
        }
    }

    function deleteItem (e) {
        console.log(toDoArr.length)
        if (toDoArr.length === 1) {
            alert("Cannot delete the last task!")
        } else {
            fetch(props.url + props.user ,{
                method: "PUT",
                body: JSON.stringify(
                    returnDeletedTodo(e.target.parentElement.id)
                ),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(resp => {
                return resp.json()
            }).then(data =>{
                console.log("Delete item returned data")
                console.log(data) // this returns the message about it being updated... need to do another fetch
                primaryFetch()
            })
        }

    }

    let listItems = toDoArr.map((item, index) => 
        <li key={index} id={index} className="d-flex justify-content-between hoverParent">
        <p className="m-2" >{item}</p>
        <button className="btn btn-danger hoverButton" 
        onClick={ deleteItem }
        ><i className="fa-solid fa-x"></i></button>
        </li>
        )

    return (
        <div>
            <h1 className="text-center">{props.user.charAt(0).toUpperCase() + (props.user.slice(1))}'s To Do List</h1>
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
                {listItems.length === 0 ? <li><p className="m-2" >Loading tasks...</p></li> : listItems}
            </ul>
        </div>
    )
}

export default ToDo