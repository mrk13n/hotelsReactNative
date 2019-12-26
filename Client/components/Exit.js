import React, { useEffect } from 'react';

const Exit = (exit, navigate, setIsError) => {
    const URL = 'http://138.68.12.218/api/logout/';

    useEffect(() => {
        const abortController = new AbortController();

        const logOut = async () => {
            try {
                const response = await fetch(URL, { signal: abortController.signal });
                const data = await response.json();
                if (data.end) navigate('Auth');
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        if (exit) logOut();

        return () => {
            abortController.abort();
        }
    }, [exit]);
};

export default Exit;