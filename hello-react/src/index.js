import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Food({name}) {
    return (
        <h1>{name} is da best</h1>
    );
}

function Drinks({name}) {
    return (
        <h1>{name} will get you drunk</h1>
    );
}


function Checkbox() {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <input
                type={"checkbox"}
                value={checked}
                onChange={() => setChecked(checked => !checked)}
            />
            {checked ? "Checked" : "Not Checked"}
        </>
    );
}

function GitHubUser({login}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://api.github.com/users/${login}`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, [login]);

    if (data) {
        return (
            <div>
                <h1>{data.login}</h1>
                <img alt={""} src={data.avatar_url} width={120}/>
            </div>
        )
    }
    return null;
}

function App({want}) {
    const [status, setStatus] = useState("Open");

    let consume = null;
    if (want === "drinks") {
        consume = <Drinks name={"The Flying Saucer"}/>
    } else if (want === "food") {
        consume = <Food name={"Central BBQ"}/>
    }
    return (
        <>
            <button onClick={() => setStatus("Closed")}>Close</button>
            <button onClick={() => setStatus("Open")}>Open</button>
            <button onClick={() => setStatus("Taking 5")}>Break</button>
            <h1>{status}</h1>
            {consume}
            <Checkbox/>
            <GitHubUser login={"jonmervine"}/>
        </>
    );
}

ReactDOM.render(
    <App want={"drinks"}/>,
    document.getElementById('root')
);
