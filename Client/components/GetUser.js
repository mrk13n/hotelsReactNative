import React, { useEffect } from 'react';

const GetUser = async (id, setUser, setIsError) => {
    const URL = 'http://138.68.12.218:3030/api/getUser/';

    useEffect(() => {
        const abortController = new AbortController();

        const getUser = async (id) => {
            try {
                const settings = {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id })
                };
                const response = await fetch(URL, settings);
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        getUser(id);

        return () => {
            abortController.abort();
        }
    }, []);
};

export default GetUser;
