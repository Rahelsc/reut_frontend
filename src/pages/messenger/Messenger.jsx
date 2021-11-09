import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { SocketContext } from "../../socketContext/SocketContext";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [msgFromFriend, setMsgFromFriend] = useState(null);
  const { currentlyOnlineFriends, setCurrentlyOnlineFriends } =
    useContext(SocketContext);
  // connect to websocket
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setMsgFromFriend({
        sender: data.senderId,
        text: data.text,
        conversationId: currentChat?._id,
      });
    });
  }, [currentChat]);

  useEffect(() => {
    msgFromFriend &&
      currentChat?.members.includes(msgFromFriend.sender) &&
      // use of arrow function to avoid adding messages as a dependency
      setMessages((prev) => [...prev, msgFromFriend]);
  }, [msgFromFriend]);

  // send to server user .emit, to get from server .on
  useEffect(() => {
    // send current user details to socket server
    socket.current.emit("addUser", user._id);
    // get user from server
    socket.current.on("getUsers", (users) => {
      setCurrentlyOnlineFriends(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user, setCurrentlyOnlineFriends]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find((m) => m !== message.sender);
    socket.current.emit("sendMessage", {
      senderId: message.sender,
      recieverId,
      text: message.text,
    });
    try {
      await axios.post("/messages", message, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
