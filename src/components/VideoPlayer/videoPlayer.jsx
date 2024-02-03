import { useParams } from "react-router-dom";

const VideoPlayer = ( ) => {
	var videoId = useParams()
	videoId = videoId.videoId
	return (
		<video id="videoPlayer" controls>
			<source src= {`/api/video/${videoId}`} type="video/mp4" />
		</video>
	);
};

export default VideoPlayer;

