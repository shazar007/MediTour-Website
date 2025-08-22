import React, { useState, useEffect } from "react";
import SimplePeer from "simple-peer";
import { Button } from "@mui/material";

const VideoCall = React.memo(() => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getMedia();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream]); // Adding localStream to dependency array

  const startCall = () => {
    if (localStream) {
      const newPeer = new SimplePeer({ initiator: true, stream: localStream });

      newPeer.on("stream", (stream) => {
        setRemoteStream(stream);
      });

      setPeer(newPeer);
    } else {
      console.error("Local stream is not available.");
    }
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
      setRemoteStream(null);
    }
  };

  return (
    <div className="VideoCall">
      <h1>Video Call VideoCall</h1>
      <div className="video-container">
        {localStream ? (
          <video
            className="local-video"
            ref={(video) => {
              if (video && localStream) {
                video.srcObject = localStream;
              }
            }}
            autoPlay
            playsInline
          />
        ) : (
          <p>No local stream available</p>
        )}

        {remoteStream && (
          <video
            className="remote-video"
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
            autoPlay
            playsInline
          />
        )}
      </div>
      <div className="buttons">
        <Button variant="contained" color="primary" onClick={startCall}>
          Start Call
        </Button>
        <Button variant="contained" color="secondary" onClick={endCall}>
          End Call
        </Button>
      </div>
    </div>
  );
});

export default VideoCall;
