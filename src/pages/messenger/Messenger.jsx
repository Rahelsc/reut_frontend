import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { SocketContext } from "../../socketContext/SocketContext";
import {
  disconnectSocket,
  innitiateSocketConnection,
  sendMessage,
  subscribeToMessages,
} from "../../socketio.service";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { currentlyOnlineFriends, setCurrentlyOnlineFriends } =
    useContext(SocketContext);

  const tokenForChat = useRef(localStorage.getItem("jwtToken"));

  useEffect(() => {
    // innitiate connection only if user is logged in (meaning we have his token)
    if (tokenForChat) {
      innitiateSocketConnection();
      subscribeToMessages((err, data) => {
        console.log(data);
        setMessages((prev) => [...prev, data]);
      });
      return () => {
        disconnectSocket();
      };
    }
  }, [tokenForChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    console.log("reciever: ", currentChat?.members);
    if (currentChat?.members.find((m) => m !== user._id)) {
      sendMessage(
        {
          message,
          roomName: String(currentChat?.members.find((m) => m !== user._id)),
        },
        (cb) => {
          console.log(cb);
        }
      );
      setMessages((prev) => [...prev, message]);
      try {
        await axios.post("/messages", message, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
      } catch (error) {
        console.log(error);
        console.log("messages: ", messages);
        setNewMessage("");
      }
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((con) => (
              <div onClick={() => setCurrentChat(con)}>
                <Conversation key={con._id} conv={con} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatboxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={currentlyOnlineFriends}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
