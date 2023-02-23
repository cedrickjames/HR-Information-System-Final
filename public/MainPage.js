import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function MainPage() {
    const [loading, setLoading] = useState(true);
    const history = useNavigate ();

    useEffect(() => {
        fetch('/check_login.php')
            .then(response => response.text())
            .then(data => {
                if (data === 'error') {
                    history.push('/');
                } else {
                    setLoading(false);
                }
            });
    }, [history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to the main page!</h1>
            <button onClick={() => {
                fetch('/logout.php')
                    .then(response => response.text())
                    .then(data => {
                        if (data === 'success') {
                            history.push('/');
                        }
                    });
            }}>Logout</button>
        </div>
    );
}

export default MainPage;
