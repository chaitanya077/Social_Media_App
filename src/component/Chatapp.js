import { useState, useEffect } from "react";
import { colRef, db, auth } from "../firebase";
import PropTypes from "prop-types";
import { useRef } from "react";
import { FiSend } from "react-icons/fi";
import { Button } from "@mui/material";
import {
  query,
  orderBy,
  limit,
  onSnapshot,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import Message from "./Message";

const Chatapp = (props) => {
  // const user = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState("");
  const { uid, displayName, photoUrl } = props.userR;
  //   const messagesRef = collection(db,'messages');

  const colRef = collection(db, "messages");
  useEffect(() => {
    if (db) {
      //queries
      const q = query(colRef, orderBy("createdAt"), limit(100));
      //realtime data collection
      let unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messag = [];
        querySnapshot.docs.forEach((doc) => messag.push(doc.data()));
        //update state
        setMessages(messag);
      });
    }
  }, [db]);

  const inputRef = useRef();
  const bottomListRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = newMessages.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      addDoc(colRef, {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        // uid,
        // displayName,
        // photoUrl,
      });
      // Clear input field
      setnewMessages("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="custom position-relative">
      <div>
        <div className="p-5  custommess6 rounded ">
          {messages
            ?.sort((first, second) =>
              first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
            )
            ?.map((message) => (
              <p key={message.id}>
                <Message {...message} />
              </p>
            ))}
        </div>
        <div ref={bottomListRef} />
        <form onSubmit={handleOnSubmit}>
          <div className="d-flex position-fixed custommess5 ps-3">
            <input
              type="text"
              value={newMessages}
              onChange={(e) => setnewMessages(e.target.value)}
              placeholder="Type your message here..."
              className="form-control"
            />
            <Button type="submit" className="" disabled={!newMessages}>
              <FiSend size={25} />
            </Button>
          </div>
        </form>
      </div>
      {/* <div className="custommess4">

      </div> */}
    </div>
  );
};

// Chatapp.propTypes = {
//     user: PropTypes.shape({
//       uid: PropTypes.string,
//       displayName: PropTypes.string,
//       photoURL: PropTypes.string,
//     }),
//   };

export default Chatapp;
