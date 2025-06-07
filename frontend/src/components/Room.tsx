import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams] = useSearchParams();
  const [socket, setSocket] = useState<null | Socket>(null);
  const [lobby, setLobby] = useState(true);

  const name = searchParams.get("name");
  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", ({ roomId }) => {
      setLobby(false);
      alert("Send offer please");
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });
    socket.on("offer", ({ roomId, offer }) => {
      setLobby(false);
      alert("Send answer please");
      socket.emit("answer", {
        roomId,
        sdp: "",
      });
    });
    socket.on("answer", ({ roomId, answer }: any) => {
      setLobby(false);
      alert("connection done");
    });
    socket.on("lobby", () => {
      setLobby(true);
    });

    setSocket(socket);
  }, [name]);

  if (lobby) {
    return <div>Finding a match</div>;
  }

  return (
    <div>
      Hi {name}
      <video width={400} height={400} />
      <video width={400} height={400} />
    </div>
  );
};
