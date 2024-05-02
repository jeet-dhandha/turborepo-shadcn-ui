"use client";
import { NextPage } from "next";
import { AppPageBodyCard } from "../../Components";
import { MenubarDemo, VideoLayout } from "../Components";
import { Room, Track } from "livekit-client";
import { useEffect, useRef } from "react";

import "@livekit/components-styles";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  VideoConference,
  useTracks,
} from "@livekit/components-react";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}

interface Props {}

const Page: NextPage<Props> = (props) => {
  let l = window ?? {};
  const hostname =
    l?.location?.hostname === "localhost" ? "127.0.0.1" : l?.location?.hostname;
  const url = `https://${hostname}:5002/krowl-in-dev/us-central1/krowl_app/gettoken`;
  console.log("url", url);
  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log("data", data, error, isLoading);

  const wsURL = "wss://krowl-app-te5f3zfq.livekit.cloud";
  const ref = useRef(false);

  if (!data || !data?.token) {
    return <span>No Token Found</span>;
  }

  const { token } = data;

  const createRoom = async () => {
    ref.current = true;
    const room = new Room();
    await room.connect(wsURL, token);
    console.log("connected to room", room.name);

    // publish local camera and mic tracks
    await room.localParticipant.enableCameraAndMicrophone();
  };

  if (!ref.current) {
    createRoom();
  }

  return (
    <div>
      <AppPageBodyCard className="flex-col p-4">
        <div className="mb-3">
          <p className="text-lg"> Room : {props.params.room_id}</p>
        </div>
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          //   serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
          serverUrl={wsURL}
          // Use the default LiveKit theme for nice styles.
          data-lk-theme="default"
          style={{ height: "100vh" }}
        >
          {/* Your custom component with basic video conferencing functionality. */}
          <MyVideoConference />
          {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
          <RoomAudioRenderer />
          {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
          <ControlBar />
        </LiveKitRoom>
        {/* <VideoLayout
          tabs={[
            "Tab 1",
            "Tab 2",
            "Tab 3",
            "Tab 4",
            "Tab 5",
            "Tab 1",
            "Tab 2",
            "Tab 3",
            "Tab 4",
            "Tab 5",
            "Tab 1",
            "Tab 2",
            "Tab 3",
            "Tab 4",
            "Tab 5",
          ]}
        /> */}
      </AppPageBodyCard>
    </div>
  );
};

export default Page;
