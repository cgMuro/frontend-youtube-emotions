import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { ErrorContext } from './ErrorState';

export const ApiContext = createContext()

export function ApiProvider(props) {

    const [predictions, setPredictions] = useState({
        data: []
    });
    const [loading, setLoading] = useState(false);
    const { getError, clearError, error } = useContext(ErrorContext);

    // Get predictions
    // GET https://app-youtube-sentiments.herokuapp.com/
    const getPredictions = async(videoURL, numberComments=20, order='relevance') => {
        try {
            // Set the page to loading
            setLoading(() => true);

            console.log('Analyzing...');

            // Make request to the API
            const result = await axios.post(`https://cors-anywhere.herokuapp.com/https://app-youtube-sentiments.herokuapp.com/api/comments/${videoURL}?maxResults=${numberComments}&order=${order}`);

            // Check for errors
            if (result.data.success) {
                // Set predictions
                setPredictions(() => result.data);

                clearError();

                // Set the page to not loading
                setLoading(() => false);

                console.log('Done.');

                return true;
            } else {
                getError(result.data['messagge'], result.data.status);

                // Set the page to not loading
                setLoading(() => false);

                console.log('Done.');
                return false;

            }
        } catch (error) {
            // Set the page to not loading
            setLoading(() => false);

            // Set error
            getError("Something went wrong", 500);

            // Return error in the console
            console.log('Something went wrong...');
            return false;
        }
    }


    return (
        <ApiContext.Provider value={{ predictions, loading, getPredictions, setLoading }}>
            {props.children}
        </ApiContext.Provider>
    )
}
