import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomVideoControls from '../CustomControls/customControls';
import RoomChat from '../RoomChat/roomChat';
import "./videoRoom.css";

const { io } = require("socket.io-client");

const socket = io("http://localhost:3001");


const VideoRoom = () => {
	const { videoId, roomId } = useParams();
	const userName = sessionStorage.getItem('firstName')
	const navigate = useNavigate(roomId);

	useEffect(() => {
		socket.emit('joinRoom', roomId);

		// Clean up event listeners on component unmount
		return () => {
			socket.emit('leaveRoom', roomId);
			// socket.disconnect();
		};
	}, [roomId]);

	// Handle syncTime event
	useEffect(() => {
		socket.on('syncTime', ({ currentTime }) => {
			// Pass the currentTime to CustomVideoControls
			setInitialTime(currentTime);
		});

		// Clean up event listener on component unmount
		return () => {
			socket.off('syncTime');
		};
	}, []);

	const [initialTime, setInitialTime] = useState(0);


	return (
		<div className='room_grid'>
			<div className="room_video">
				<CustomVideoControls
					videoSource={`/api/video/${videoId}`}
					roomId={roomId} socket={socket}
					initialTime={initialTime}
				/>
			</div>
			<div className="room_chat">
				<RoomChat roomId={roomId} socket={socket} userName={userName} />
			</div>
		</div>
	);
};

export default VideoRoom;
