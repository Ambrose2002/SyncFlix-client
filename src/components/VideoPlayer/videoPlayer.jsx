import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoId }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const token = localStorage.getItem('token');
            try {
                console.log("Sending fetch request")
                console.log(videoId)
                const response = await fetch(`/api/video/${videoId}`, {
                    method: "Get",
                    mode: "cors",
                    headers: {
						Authorization: token,
					}
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const blob = await response.blob();
                const videoURL = URL.createObjectURL(blob);

                // Set the video source and start playing
                videoRef.current.src = videoURL;
                videoRef.current.play();
            } catch (error) {
                console.error('Error fetching video:', error.message);
            }
        };

        fetchVideo();
    }, [videoId]);

    return (
        <video controls width="640" height="360" autoPlay muted>
            <source src = "api/video"/>
        </video>
    );
};

export default VideoPlayer;
