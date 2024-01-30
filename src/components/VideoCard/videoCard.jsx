import React from 'react';
import './videoCard.css';

const VideoCard = ({ title, filename }) => {
    return (
        <div className="video-card">
            {/* <div className="video-thumbnail">
                <img src="" alt={`${title}`} />
            </div> */}
            <div className="video-info">
                <h3 className="video-title">{title}</h3>
            </div>
        </div>
    );
};

export default VideoCard;
