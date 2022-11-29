import "../styles/PostStyles.css";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { colRef, db , auth} from "../firebase";
import EmojiPicker from 'emoji-picker-react';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import { BsTrash } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import Chatapp from "./Chatapp";

const Post = (props) => {
  console.log();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const userr = ()=> auth.currentUser;
  // let usernamee= props.userName;
  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = onSnapshot(
        collection(db, "posts", props.postId, "comments"),
        (snapshot) => {
          let postss = [];
          snapshot.docs.map((doc) => postss.push(doc.data()));
          setComments(postss);
          console.log(postss);
        }
      );
    }
    return () => {
      unsubscribe();
    };
  }, [props.postId]);

  const deletePost = async (e) => {
    e.preventDefault();
    deleteDoc(await deleteDoc(doc(db, "posts", props.postId)));
  };

  const postComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", props.postId, "comments"), {
      text: comment,
      username: props.userR.displayName,
      // timestamp: serverTimestamp()
    });
    setComment("");
  };
  console.log(comments[0]);
  // console.log(props.userR.displayName);
  return (
    <div className="">
    <div className="post rounded ">
      <div className="post_header row">
        <div className="d-flex col-10 ">
          <Avatar className="post_avatar " alr="Avatar" src="data:image/jpeg;base64,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" />
          <h4 className="px-3 pt-1">{props.userName}</h4>
        </div>
        <div className="col-2">
          <Button
            className="post_button outline-none"
            type="submit"
            onClick={deletePost}
          >
            <BsTrash size={25} />
          </Button>
        </div>
      </div>
      {/* header -> avatar + username*/}
      <img className="post_image" src={props.imageUrl} alt="alternate image" />
      {/* image */}

      <h4 className="post_text">
        <strong>{props.userName} </strong>
        {props.captionText}
      </h4>
      {/* username + caption  */}

      <div className="post_comments px-4">
        {comments.map((commentt) => (
          <p>
            <b>
              <strong>{commentt.username}</strong>{" "}
            </b>
            {commentt.text}
          </p>
        ))}
      </div>
      {props.userR && (
        <form className="post_commentBox">
          <input
            className="post_input form-control"
            type="text"
            placeholder="add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {/* <EmojiPicker/> */}
          <Button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            <AiOutlineSend size={30} />
          </Button>
        </form>
      )}
    </div>
    {/* <div className="col-6">
    <Chatapp userR={props.userR}/>
    </div> */}
</div>
  );
};

export default Post;
