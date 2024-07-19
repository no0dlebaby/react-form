import { useState } from "react";

function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    async function handleClick() {
        console.log("button clicked");
        const url = "https://fsa-jwt-practice.herokuapp.com/authenticate";

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setSuccessMessage(result.message);
            console.log(result);

            if (result.data) {
                setUser(result.data);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error:", error.message);
        }
    }
    return (
    <>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>authenticate token</button>
        {user && (
                <div>
                    <p>Authenticated User: {user.username}</p>
                </div>
            )}
    </>
    );
}

export default Authenticate