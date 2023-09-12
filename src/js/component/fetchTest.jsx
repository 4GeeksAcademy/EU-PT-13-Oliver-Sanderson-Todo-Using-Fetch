import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function FetchTest () {

    const [loggedIn, setLoggedIn] = useState(false)
    const [taskList, setTaskList] = useState(["OLD"])
    const [username, setUsername] = useState("")

    useEffect(() => {
        if(loggedIn) {
            fetch("https://playground.4geeks.com/apis/fake/todos/user/" + username)
            .then(response => {
                return response.json();
            })
            .then(data => { 
                setTaskList(data.map((item) => item.label));
            })
        } else {
            setTaskList([])
        }
    }, [loggedIn])


    return (
        <div>
            logged in = {loggedIn ? "TRUE" : "FALSE"}
            <div className="d-flex">
                <label for="usernameInput" className="usernameNameplate">Enter Username: </label>
                <input id="usernameInput" className={loggedIn ? "bg-secondary" : ""} onChange={ e => setUsername(e.target.value)} value={username} disabled={loggedIn ? true : false} ></input>
                
            </div>
            <p id="validUserText" className="">Not logged in</p>
            <button className={`btn btn-${loggedIn ? "danger" : "success"}`} onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "Logout" : "Login"}</button>
            {loggedIn ? <ToDo tasks={taskList} user={username} /> : ""}
        </div>
    )
}

export default FetchTest