import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function FetchTest () {

    const [fetchedData, setFetchedData] = useState(["loading..."])
    const [loggedIn, setLoggedIn] = useState(false)
    const [showToDo, setshowToDo] = useState(false)
    const [taskList, setTaskList] = useState([])
    let usernameSet = " "

    useEffect(() => 
    {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/oliver")
        .then((returned) => {
            if(!returned.ok) {setFetchedData("Something went wrong!")}
            return returned.json()
        })
        .then((dataToWork) => {
            setFetchedData(dataToWork.map((item, index) => <div key={index}>{item.label}</div>));
            return dataToWork
            } )
        .catch(error => {
            //error handling
            console.log(error);
        });
    }, []
    )

    function staticSetTest() {
        fetch ("https://playground.4geeks.com/apis/fake/todos/user/oliver" , {
            method: "PUT",
            body: JSON.stringify(
                [
                    { "label": "Eat some cake", "done": false },
                    { "label": "Pet the cat", "done": false },
                    { "label": "Feed the fish", "done": false }
                ]
            ),

            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            console.log(resp.ok); // will be true if the response is successfull
            console.log(resp.status); // the status code = 200 or code = 400 etc.
            console.log(resp.text()); // will try return the exact result as string
            return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        .then(data => {
            //here is where your code should start after the fetch finishes
            console.log(data); //this will print on the console the exact object received from the server
        })
        .catch(error => {
            //error handling
            console.log(error);
        });
    }

    function checkUser () {

        if(loggedIn) {
            setLoggedIn(false)
            setTaskList([])
            setshowToDo(false)
        } else {

            fetch("https://playground.4geeks.com/apis/fake/todos/user/" + usernameSet)
            .then(
                jsonData => jsonData.json()
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
            ).then(() => {console.log(taskList); setshowToDo(true)})
        }
    }


    return (
        <div>
            logged in = {loggedIn ? "TRUE" : "FALSE"}
            <div className="d-flex">
                <label for="username" className="usernameNameplate">Enter Username: </label>
                <input id="username" className={loggedIn ? "bg-secondary" : ""} onChange={ e => usernameSet = e.target.value } disabled={loggedIn ? true : false}></input>
                
            </div>
            <p id="validUserText" className="">Not logged in</p>
            <button className={`btn btn-${loggedIn ? "danger" : "success"}`} onClick={checkUser}>{loggedIn ? "Logout" : "Login"}</button>
            <div>{fetchedData}</div>
            <button onClick={staticSetTest}>Update tasks</button>
            {showToDo ? <ToDo tasks={taskList} /> : ""}
        </div>
    )
}

export default FetchTest