import React, { useEffect, useRef, useContext } from 'react';
import { FaMicrophoneSlash, FaSync, FaPowerOff, FaComments, FaMicrophone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Context from "../Context/Context";

function Proctor() {
  const { peer, socket, createAnswer, remoteStream } = useContext(Context);
  const id = "Aman Shah";
  const room = "64ad5f9e45b42363f65554df";
  const remoteRef = useRef(null);

  useEffect(() => {
    socket.emit("room_join", { id, room });
  }, []);

  useEffect(() => {
    socket.on("incoming_call", async (data) => {
      const { from, offer } = data;
      const ans = await createAnswer(offer);
      socket.emit("call_accepted", { from, ans });
    });

    return () => {
      socket.off("incoming_call");
    };
  }, []);

  useEffect(() => {
    remoteRef.current.srcObject = remoteStream;
    // remoteRef.current.play()
  }, [remoteStream]);

  return (
    <>
      <div className="proctor">
        <div className='mute-rotate-signout container'>
          <button className='red-active mute'><FaMicrophoneSlash size={35} /></button>
          <button className='mute' onClick={() => { location.reload() }}><FaSync size={28} /></button>
          <button className='mute'>
            <Link to='/'>
              <FaPowerOff size={28} />
            </Link>
          </button>
        </div>
        <div className='proctor-panel-content'>
          <div className='testtaker-streams'>
            <strong>Name:</strong>
            <p style={{ display: 'inline-block', 'marginBottom': '5px', 'marginLeft': '5px', 'fontWeight': '460' }}>Aman Shah</p>
            <div className='three-streams'>
              <div className="live" style={{ 'marginRight': '10px' }}>
                <video ref={remoteRef} autoPlay controls style={{ 'width': "100%", 'height': '100%' }} src="" id='live_webcam'></video>
              </div>
              <div className="live" style={{ 'marginRight': '10px' }}>
                <video style={{ 'width': "100%", 'height': '100%' }} src="" id='live_screen' autoPlay={true}></video>
              </div>
              <div className="live">
                <video src="" id='live_mobile' autoPlay={true}></video>
              </div>
            </div>
            <div className="live-tools">
              <div className="live-incident">
                <input type="text" placeholder='Incident' />
                <button id='report' >Report</button>
              </div>
              <div className="end-mute-msg">
                <button id='endbutton' className='end-session'>End Session</button>
                <button
                  //  onClick={handleChatOpen} 
                  className='msg-mute' style={{ 'marginRight': '5px', 'height': '100%' }}><FaComments size={14} /></button>
                <button className='msg-mute' style={{ 'height': '100%' }}><FaMicrophone size={14} /></button>
              </div>
            </div>
          </div>
          <div className='proctor-instructions'>
            <div className=' d-flex'>
              <div className='res-inci restri'>
                Restrictions
              </div>
              <div className='res-inci'>
                Incidents
              </div>
            </div>
            <div className='res-inci-content'>
              <ul className='ul'>
                <li>Student is not allowed to use the internet</li>
                <li>Student is not allowed to use any external applications</li>
                <li>Student is not allowed to use any textbooks</li>
                <li>Students may use a calculator
                  <p>Battery powered NON-programmable</p>
                </li>
                <li>Students may use pen and paper</li>
                <li>Student is not allowed to use additional materials</li>
                <li>Additional info:
                  <p style={{ 'marginLeft': '15px' }}><strong>Candidates are permitted to have one 10 minutes toilet break</strong>. To be flagged as an incident by proctor or reviewer. The timer does not stop for a bathroom break. <strong>Candidate to inform chat support they will be taking a toilet break.</strong> Candidates have to complete re-entry to exam session including removing watches, unapproved eyeglasses, emptying pockets, and scanning the room via mobile device.
                    <br />
                    <strong>Allowing 2 sheets to make notes on throughout the exam. Should be checked at the start of the session.
                    </strong>
                    <strong>Notes MUST be ripped/torn at the end of the session. Flag if this does not happen.</strong><br /> <br /> - <br />
                  </p>
                </li>
                <ul> <strong>Violations List:</strong>
                  <li>Looking at mobile phone/tablet</li>
                  <li>Wearing of any earplugs or headphones</li>
                  <li>Continuously looking around room</li>
                  <li>Continuously looking up or down</li>
                  <li>Continuously looking to the left or to the right</li>
                  <li>Wearing of any clothing with the ability to hide materials i.e. hooded jumper</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        {/* {chatBox && 
        <Chatbox socket={socket}/>
        } */}
      </div>
    </>
  )
}

export default Proctor