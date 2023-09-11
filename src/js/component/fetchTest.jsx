import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function FetchTest () {

    const [loggedIn, setLoggedIn] = useState(false)
    const [showToDo, setshowToDo] = useState(false)
    const [taskList, setTaskList] = useState([])
    let usernameSet = " "

    function checkUser () {
        if(usernameSet === "") {document.getElementById("validUserText").innerHTML = "Please enter a username"}
        else {
        if(loggedIn) {
            setLoggedIn(false)
            setTaskList([])
            setshowToDo(false)
        } else {

            fetch("https://playground.4geeks.com/apis/fake/todos/user/" + usernameSet)
            .then(
                jsonData => {
                    if(!jsonData.ok) {document.getElementById("validUserText").innerHTML = "Connection problems"};
                    return jsonData.json()
                }
            ).then(
                data => {
                    if(data.msg) {
                        document.getElementById("validUserText").innerHTML = data.msg
                        setLoggedIn(false)
                        setshowToDo(false)
                    } else {
                        document.getElementById("validUserText").innerHTML = "Logged in as " + usernameSet
                        setLoggedIn(true)
                        for (let i = 0; i < data.length; i++) {
                            setTaskList((pre) => {pre.push(data[i].label); return pre})
                            console.log(taskList)
                        }

                    }
                
                }
            )

        }}
    }


    return (
        <div>
            logged in = {loggedIn ? "TRUE" : "FALSE"}
            <div className="d-flex">
                <label for="username" className="usernameNameplate">Enter Username: </label>
                <input id="username" className={loggedIn ? "bg-secondary" : ""} onChange={ e => usernameSet = e.target.value } disabled={loggedIn ? true : false} ></input>
                
            </div>
            <p id="validUserText" className="">Not logged in</p>
            <button className={`btn btn-${loggedIn ? "danger" : "success"}`} onClick={checkUser}>{loggedIn ? "Logout" : "Login"}</button>
            {loggedIn ? <ToDo tasks={taskList} user={usernameSet} /> : ""}
        </div>
    )
}

export default FetchTest