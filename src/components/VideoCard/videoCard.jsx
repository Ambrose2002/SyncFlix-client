import React from 'react';
import './videoCard.css';

const VideoCard = ({ title, filename, videoId }) => {
    
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        console.log(videoId)
        const response = await fetch(`/api/video/${videoId}`, {
            method: 'DELETE',
            headers: {
                Authorization: token,
            },
        });

        if (response.ok) {
            console.log('Video deleted');
            window.location.reload();
        } else {
            console.error('Error deleting video:', response.statusText);
        }
    }

    return (
        <div className="video-card">
            {/* <div className="video-thumbnail">
                <img src="" alt={`${title}`} />
            </div> */}
            <div className="video-info">
                <h3 className="video-title">{title}</h3>
            </div>
            <div className="play">
                <button className='card_button'>Play Video</button>
            </div>
            <div className="delete">
                <button className='card_button' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default VideoCard;
