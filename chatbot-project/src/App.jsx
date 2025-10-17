import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('')

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  async function sendMessage() {
    setInputText('')  

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src="loading-spinner.gif" className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ])

    const response = await Chatbot.getResponseAsync(inputText)
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ])
    }

    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        sendMessage()
      }
    }

    return (
      <div className="chat-input-container">
        <input 
          placeholder="Send a message to Chatbot"
          size="30"
          onChange={saveInputText}
          onKeyDown={handleKeyDown}
          value={inputText}
          className="chat-input"
        />
        <button 
          onClick={sendMessage}
          className="send-button"
        >Send</button>
      </div>
    )
  }

  function ChatMessage({ message, sender }) {
    return (
      <div className={
        sender === 'user' 
          ? 'chat-message-user' 
          : 'chat-message-robot'
      }>
        {sender === 'robot' && (
          <img src="robot.png" className="chat-message-profile" />
        )}
        <div className="chat-message-text">
          {message}
        </div>
        {sender === 'user' && (
          <img src="user.png" className="chat-message-profile" />
        )}
      </div>
    )
  }

  function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null)

    useEffect(() => {
      const containerElem = chatMessagesRef.current
      if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight
      }
    }, [chatMessages])

    return (
      <div
        className="chat-messages-container"
        ref={chatMessagesRef}
      >
        {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message} 
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          )
        })}
      </div>
    )
  }

function App() {
  const [chatMessages, setChatMessages] = useState([])

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
