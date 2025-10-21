import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingSpinnerGif from '../assets/loading-spinner.gif'
import './ChatInput.css'

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
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: null
      }
    ])

    const response = await Chatbot.getResponseAsync(inputText)
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ])
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  function clearMessages() {
    setChatMessages([])
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
      <button
        onClick={clearMessages}
        className="clear-button"
      >Clear</button>
    </div>
  )
}

export default ChatInput