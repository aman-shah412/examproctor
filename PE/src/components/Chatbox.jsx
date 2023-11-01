import React ,{useState,useEffect} from 'react'

function Chatbox({socket}) {
  const [chatBoxMinimize, setChatBoxMinimize] = useState(true)

  const [count, setCount] = useState("")
  const [sender, setSender] = useState([])
  const messageData = {
    message:count,
    time:"15:22",
  }

  
  const sendMessage = async (e)=>{
    e.preventDefault()
    await socket.emit("send", messageData)
  }
  
  // useEffect(() => {
  //   socket.on("receive", (data)=>{
  //     setSender((list)=>[...list, data])
  //     console.log(socket)
  //  })
   

  // }, [socket])

    const handleChatMinimize = () => {
        setChatBoxMinimize(e => !e)
      }

    return (
        <div className={chatBoxMinimize ? "chat" : "chat_minimize"} >
            <div onClick={handleChatMinimize} style={{ 'width': '100%', 'height': '35px', 'backgroundColor': 'gray', 'borderBottom': '1px solid black', 'cursor': 'pointer' }}>
                Aman Shah
                <button style={{ 'float': 'right', 'height': '100%', 'border': 'none' }}>X</button>
            </div>
            {chatBoxMinimize && <div style={{ 'height': '19.1rem', 'overflowY': 'auto' }}>
                <div className="right_text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit adipisci velit, ea laudantium atque corrupti ad aliquid dignissimos reiciendis illum
                </div>
                <div className="left_text">
                    HI
                </div>
            </div>}
            {chatBoxMinimize && <form onSubmit={sendMessage}>
                <input type="text" value={count} onChange={(e) => { setCount(e.target.value) }} placeholder='Enter your message' style={{ 'width': '100%', 'height': '25px', 'padding': '8px', 'outline': 'none', }} />
            </form>}
        </div>
    )
}

export default Chatbox