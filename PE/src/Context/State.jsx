import React, { useState, useEffect } from 'react';
import Context from './Context';
import { io } from 'socket.io-client';

const State = (props) => {
    const [newExam, setNewExam] = useState(true);
    const [step2, setStep2] = useState(true);
    const [step3, setStep3] = useState(true);
    const [step4, setStep4] = useState(true);
    const [step5, setStep5] = useState(true);
    const [remoteStream, setRemoteStream] = useState(null);
    // const socket = io('http://localhost:4000');
    const socket = "io('http://localhost:4000')";
    const peer = new RTCPeerConnection({
        iceServers: [
            {
                urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
            },
        ],
    });

    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(offer);
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    };

    const callAccepted = async (ans) => {
        try {
            await peer.setRemoteDescription(ans);
        } catch (error) {
            console.error('Error accepting call:', error);
        }
    };

    const sendStream = async (stream) => {
        try {
            const tracks = stream.getTracks();
            tracks.forEach((track) => peer.addTrack(track, stream));
        } catch (error) {
            console.error('Error sending stream:', error);
        }
    };

    useEffect(() => {
        const handleTrack = (event) => {
            const streams = event.streams;
            setRemoteStream(streams[0]);
        };

        peer.addEventListener('track', handleTrack);

        return () => {
            peer.removeEventListener('track', handleTrack);
        };
    }, [peer]);

    return (
        <Context.Provider
            value={{
                newExam,
                setNewExam,
                step2,
                setStep2,
                step3,
                setStep3,
                step4,
                setStep4,
                step5,
                setStep5,
                socket,
                peer,
                createOffer,
                createAnswer,
                callAccepted,
                sendStream,
                remoteStream,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;