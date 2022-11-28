import { useState, useEffect } from "react";
import { colRef, db, auth } from "../firebase";
import { useRef } from "react";
import {
  query,
  orderBy,
  limit,
  onSnapshot,
  collection,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import Message from "./Message";

const Chatapp = (props) => {
    // const user = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState("");
  const { uid, displayName, photoUrl } = props.userR || null;
  const messagesRef = collection(db,'messages');

  useEffect(() => {
    if (db) {
      const colRef = collection(db, "messages");
      //queries
      const q = query(colRef, orderBy("createdAt"), limit(100));
      //realtime data collection
      let unsubscribe = onSnapshot(q, (querySnapshot) => {
         let messag = [];
        querySnapshot.docs.map((doc) => messag.push(doc.data()));
        //update state
        setMessages(messag);
      });
    }
  }, [db]);

  const inputRef = useRef();
  const bottomListRef = useRef();

//   const postComment = async (e) => {
//     e.preventDefault();
//     await addDoc(collection(db, "posts", props.postId, "comments"), {
//       text: comment,
//       username: props.userR.displayName,
//       // timestamp: serverTimestamp()
//     });
//     setComment("");
//   };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessages.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
       await addDoc(collection(db,"messages"),{
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        // uid,
        // displayName,
        // photoUrl,
      });
      // Clear input field
      setnewMessages('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="custom">
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Message {...message} />
          </li>
        ))}
      </ul>
      <div ref={bottomListRef} />
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={newMessages}
          onChange={(e)=>setnewMessages(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!newMessages}>
          send
        </button>
      </form>
    </div>
    </div>
  );
};

export default Chatapp;
