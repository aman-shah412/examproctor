import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Context from "../Context/Context";
import CandidateRR from './CandidateRR';
import CandidateLiveProctor from './CandidateLiveProctor'
import CandidateClassRoom from './CandidateClassRoom';

function Candidate() {
  const { socket, peer, createOffer, callAccepted, sendStream } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [adminData, setAdminData] = useState("");
  const [media, setMedia] = useState(null);
  const [classRoom, setClassRoom] = useState(false);
  const [record_Review, setRecord_Review] = useState(false);
  const [liveProctor, setLiveProctor] = useState(false);
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const currentUserVideoRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8004/candidateid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data[1].Title === "Classroom") {
          setClassRoom(true)
        }
        if (data.data[1].Title === "Record & Review") {
          setRecord_Review(true)
        }
        if (data.data[1].Title === "Live Proctoring") {
          setLiveProctor(true)
        }
        setAdminData(data.data[1])
        setName(data.data[0].Students[0].studentName);
        if (data.data[0].Students[0].status === "Email Sent") {
          fetch(`http://localhost:8004/candidateinsetup/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mainID: data.data[1]._id })
          }).then((response) => response.json())
            .then((data) => {
              console.log(data);
            }).catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (adminData.Title === "Live Proctoring") {

    const turnOnWebcam = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((webcamStream) => {
          setMedia(webcamStream);
          currentUserVideoRef.current.srcObject = webcamStream;
          currentUserVideoRef.current.play();
          sendStream(webcamStream);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      socket.emit("room_join", { id, room: id });
    }, []);

    useEffect(() => {
      socket.on("user_joined", async ({ id, Id }) => {
        const offer = await createOffer();
        setRemoteSocketId(id);
        socket.emit("call_user", { id, offer });
      });
      socket.on("call_accepted", async ({ ans }) => {
        await callAccepted(ans);
      });

      return () => {
        socket.off("user_joined")
        socket.off("call_accepted")
      }
    }, [socket]);

    useEffect(() => {
      const handleNegotiationNeeded = async () => {
        try {
          const localOffer = await peer.createOffer();
          await peer.setLocalDescription(localOffer);
          socket.emit("call_user", { id: remoteSocketId, offer: localOffer });
        } catch (error) {
          console.error("Error creating offer:", error);
        }
      };

      peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

      return () => {
        peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
      };
    }, []);
  }

  return (
    <>
      {classRoom && <CandidateClassRoom name={name} id={id} />}
      {record_Review && <CandidateRR name={name} id={id} />}
      {liveProctor && <CandidateLiveProctor name={name} id={id} />}
    </>
  )
}

export default Candidate