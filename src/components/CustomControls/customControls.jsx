import React, { useState, useRef, useEffect } from 'react';
import './customControls.css';

const CustomVideoControls = ({ videoSource, roomId, socket, initialTime }) => {
    const videoRef = useRef(null);
    const [isPlaying, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(initialTime);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const video = videoRef.current;

        // Set initial playback time
        if (video) {
            video.currentTime = initialTime;
        }

        // Set up event listeners
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        socket.on('play', () => {
            setPlaying(true);
            videoRef.current.play();
        });

        socket.on('pause', () => {
            setPlaying(false);
            videoRef.current.pause();
        });

        socket.on('seek', (time) => {
            setCurrentTime(time);
            videoRef.current.currentTime = time;
        });

        socket.on('syncTime', ({ currentTime }) => {
            setCurrentTime(currentTime);
            videoRef.current.currentTime = currentTime;
        });



        // Clean up event listeners on component unmount
        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [roomId, initialTime]);

    const handlePlay = () => {
        if (videoRef.current) setPlaying(true);
    };

    const handlePause = () => {
        if (videoRef.current) setPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const newTime = videoRef.current.currentTime;
            setCurrentTime(newTime);
            socket.emit('updateTime', { roomId: roomId, currentTime: newTime });
        };
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    const handlePlayPauseClick = () => {
        const video = videoRef.current;
        if (videoRef.current) {
            if (isPlaying) {
                video.pause();
                socket.emit('pause', roomId);
            } else {
                video.play();
                socket.emit('play', roomId);
            }
        }
    };

    const handleTimeSliderChange = (e) => {
        const newTime = e.target.value;
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            socket.emit('seek', roomId, newTime);
        }
    };

    useEffect(() => {
        // Send the current playback time to the server periodically
        const interval = setInterval(() => {
            if (videoRef.current & isPlaying) {
                socket.emit('updateTime', { roomId, currentTime: videoRef.current.currentTime });
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [currentTime, roomId]);


    return (
        <div className="custom-video-controls">
            <video ref={videoRef} src={videoSource} autoPlay className='video'/>
            <div className="controls-container">
                <button onClick={handlePlayPauseClick} className='play_button'>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeSliderChange}
                />
                <div className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
        </div>
    );
};

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default CustomVideoControls;
