import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function Login () {

    const [loggedIn, setLoggedIn] = useState(false)
    const [taskList, setTaskList] = useState(["OLD"]) //no longer using this as created a fetch within the ToDo component
    const [username, setUsername] = useState("")
    const [allOk, setAllOK] = useState(false)
    const [createShown, setCreateShown] = useState(false)
    const URL = "https://playground.4geeks.com/apis/fake/todos/user/"

    useEffect(() => {
        if(loggedIn) {
            fetch(URL + username)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    document.getElementById("validUserText").innerHTML = "Connection problems!"

                } else {
                    setAllOK(true)
                }
                return response.json();

            })
            .then(data => { 
                console.log(data)
                if(data.msg) {
                    document.getElementById("validUserText").innerHTML = data.msg
                    setCreateShown(true)
                }
                setTaskList(data.map((item) => item.label));
                document.getElementById("validUserText").innerHTML = "Logged in as " + username
            }).catch((error) => console.log(error))
        } else {
            setTaskList([])
            document.getElementById("validUserText").innerHTML = "Not logged in"
            setAllOK(false)
            setCreateShown(false)
        }
    }, [loggedIn])

    function deleteUser () {
        if(confirm("Are you sure you want to delete the user '" + username + "' and all the related tasks?")) {
            fetch(URL + username, {
                method: "DELETE"
            })
            setLoggedIn(false)
            alert("User " + username + " deleted")
        }
    }

    function createUser () {
        fetch(URL + username, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }    
        })
        alert("User "+ username + " created")
        setLoggedIn(false)
    }

    return (
        <div>
            <br></br>
            <div className="d-flex">
                <label for="usernameInput" className="usernameNameplate" hidden={loggedIn ? true : false}>Enter Username: </label>
                <input id="usernameInput" onChange={ e => setUsername(e.target.value)} value={username} hidden={loggedIn ? true : false} 
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setLoggedIn(!loggedIn)
                            }
                            }}                
                ></input>
                
            </div>
            <p id="validUserText" className="fst-italic">Not logged in</p><button className="btn btn-success" onClick={createUser} hidden={createShown ? false : true}>Create user?</button>
            <div className="d-flex justify-content-between">
                <button className={`btn btn-${loggedIn ? "danger" : "success"}`} onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "Return to login" : "Login"}</button>
                {allOk ? <button className="btn btn-secondary deleteUser" onClick={deleteUser}>Delete user</button> : ""}
            </div>
            {allOk ? <ToDo tasks={taskList} user={username} url={URL} /> : ""}
        </div>
    )
}

export default Login