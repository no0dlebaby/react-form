import { useState } from "react";

function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState("");
    

    const nameForm = () => {
        let name = true;
        if (username.length < 8) {
            setUsernameError("username must be at least 8 characters long.");
            name = false;
        } else {
            setUsernameError("");
        }
        return name;
    };


    async function handleSubmit(event) {
        event.preventDefault();

        if (!nameForm()) {
            return;
        }
        const url = "https://fsa-jwt-practice.herokuapp.com/signup";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            if (result.token) {
                setToken(result.token);
            } else {
                throw new Error("No token in response");
            }

        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                username: <input 
                value={username}
                onChange={ (e) => {
                    setUsername (e.target.value);
                }}/>
            </label>
            {usernameError && <p>{usernameError}</p>}
            <br/>
            <label>
                password: <input 
                value={password}
                onChange={ (e) => {
                    setPassword (e.target.value)
                }}/>
            </label>
            <br/>
            <button>submit</button>
        </form>
        </>
    )
}



export default SignUpForm