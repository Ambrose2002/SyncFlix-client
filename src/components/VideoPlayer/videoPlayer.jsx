import { useParams } from "react-router-dom";

const VideoPlayer = ( ) => {
	var videoId = useParams()
	videoId = videoId.videoId
	return (
		<video id="videoPlayer" controls muted autoPlay playsInline>
			<source src= {`https://desolate-bayou-93955-64c6896ee0b5.herokuapp.com/api/video/${videoId}`} type="video/mp4" />
		</video>
	);
};

export default VideoPlayer;

