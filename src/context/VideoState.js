import React, { useState, createContext } from 'react';

export const VideoContext = createContext()

export function VideoProvider(props) {

    const [videoURL, setVideoURL] = useState('');


    return (
        <VideoContext.Provider value={{ videoURL, setVideoURL }}>
            {props.children}
        </VideoContext.Provider>
    )
}
