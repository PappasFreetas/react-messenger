import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { async } from 'rxjs';

/**
 * Chat component
 * Provides messaging interface for users to send/receive messages
 */
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]); // messages
  const [newMessage, setNewMessage] = useState(''); // input field
  const [error, setError] = useState<string | null>(null); // error messages

  const userId = 1; // simulated logged-in user ID
  const contactID = 5; // simulated contact user iD

  /**
   * Fetches the conversation history between two users
   */
  const fetchMessages = async () => {
    try {
      setError(null); // clear previous errors

      // fetch messages from backend
      const response = await axios.get(
        `http://localhost:3000/api/messages/${userId}/${contactID}`
      );

      // update state with fetched messages
      setMessages(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load messages');
    }
  };

  /**
   * Handles sending a new message
   * @param e - form submission event
   */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    try {
      setError(null); // clear previous errors

      // send new message to backend
      const response = await axios.post('http://localhost:3000/api/messages/send', {
        sender: userId,
        receiver: contactID,
        content: newMessage,
      });

      // add sent message to local state
      setMessages((prevMessages) => [...prevMessages, response.data]);

      // clear the input field
      setNewMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2x1 font-bold mb-4">Chat</h1>
      <div className="w-1/3 border p-4 rounded-lg shadow-md">
        {/* Conversation History */}
        <div className="mb-4 h-64 overflow-y-auto border-b pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender.id === userId
                  ? 'text-right' // right align messages sent by logged-in
                  : 'text-left' // left-align messages received
              }`}
            >
              <p
                className={`inline-block px-3 py-2 rounded-lg ${
                  message.sender.id === userId
                    ? 'bg-blue-500 text-white' // style for sent messages
                    : 'bg-gray-300 text-black'// style for received messages
                }`}
              >
                {message.content}
              </p>
            </div>
            ))}
        </div>

        {/* Send Message Form */}
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>

      {/*Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Chat;
