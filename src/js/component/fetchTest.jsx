import React, { useState, useEffect } from "react";

function FetchTest () {

    const [fetchedData, setFetchedData] = useState(["loading..."])

    useEffect(() => 
    {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/oliver")
        .then((returned) => {
            console.log(returned);
            if(!returned.ok) {setFetchedData("Something went wrong!")}
            return returned.json()
        })
        .then((dataToWork) => {
            console.log(dataToWork[0].label);
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
        console.log("Button clicked!")
        fetch ("https://playground.4geeks.com/apis/fake/todos/user/oliver", {
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

    return (
        <div>
        <div>{fetchedData}</div>
        <button onClick={staticSetTest}>Update tasks</button>
        </div>
    )
}

export default FetchTest