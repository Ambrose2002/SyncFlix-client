// import React, { useEffect, useRef } from 'react';

// const VideoPlayer = ({ videoId }) => {
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const fetchVideo = async () => {
//             const token = localStorage.getItem('token');
//             const rangeHeader = 'bytes=0-';
//             try {
//                 console.log("Sending fetch request")
//                 console.log(videoId)
//                 const response = await fetch(`/api/video/`, {
//                     method: "Get",
//                     mode: "cors",
//                     headers: {
// 						Authorization: token,
//                         Range: rangeHeader
// 					}
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const blob = await response.blob();
//                 const videoURL = URL.createObjectURL(blob);

//                 // Set the video source and start playing
//                 videoRef.current.src = videoURL;
//                 videoRef.current.play();
//             } catch (error) {
//                 console.error('Error fetching video:', error.message);
//             }
//         };

//         fetchVideo();
//     }, []);

//     return (
//         <video ref={videoRef} controls width="640" height="360" autoPlay muted>
//             <source src = "api/video"/>
//         </video>
//     );
// };

// export default VideoPlayer;

import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoId }) => {
    // const videoRef = useRef(null);
    // const [seekRange, setSeekRange] = useState('bytes=0-');

    // const handleSeek = (e) => {
    //     const newRange = `bytes=${e.target.currentTime}-`;
    //     setSeekRange(newRange);
    // };

    // const handleSeek = (e) => {
    //     const currentTime = e.target.currentTime;
    //     const videoLength = e.target.duration;
    
    //     // Calculate a valid start position based on the current time
    //     const maxStartPosition = videoLength - 1;
    //     const calculatedStartPosition = Math.min(currentTime, maxStartPosition);
    
    //     const newRange = `bytes=${calculatedStartPosition.toFixed(0)}-`;
    //     setSeekRange(newRange);
    // };
    

    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         const token = localStorage.getItem('token');
    //         try {
    //             const response = await fetch('/api/video/', {
    //                 method: 'GET',
    //                 mode: 'cors',
    //                 headers: {
    //                     Authorization: token,
    //                     Range: seekRange,
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }

    //             const blob = await response.blob();
    //             const videoURL = URL.createObjectURL(blob);

    //             // Set the video source and start playing
    //             videoRef.current.src = videoURL;
    //             videoRef.current.play();
    //         } catch (error) {
    //             console.error('Error fetching video:', error.message);
    //         }
    //     };

    //     fetchVideo();
    // }, [seekRange]);

    return (
        <video id="videoPlayer" width="650" controls muted="muted" autoplay>
        <source src="api/video" type="video/mp4" />
      </video>
    );
};

export default VideoPlayer;

