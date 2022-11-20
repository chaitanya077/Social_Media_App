import  '../styles/PostStyles.css';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { colRef, db } from '../firebase';
import { addDoc, collection, CollectionReference, doc, DocumentReference, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Button } from "@mui/material";


const Post = (props)=>{
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(()=>{
    let unsubscribe;
    if(props.postId){
      unsubscribe = onSnapshot(collection(db,"posts",props.postId,"comments"),(snapshot)=>{
        let postss = [];
        snapshot.docs.map(doc=>(
          postss.push(doc.data())
        ))
        setComments(postss);
        console.log(postss)
      }) 
    }
    return ()=>{
      unsubscribe();
    }
  },[props.postId]);
 
   const postComment = async (e)=>{
    e.preventDefault();
    await addDoc(collection(db,"posts",props.postId,"comments"),{
      text: comment,
      username: props.userR.displayName,
      // timestamp: serverTimestamp()
    });
    setComment("");
   }
  console.log(comments[0]);
  // console.log(props.userR.displayName);
  return(
    <div className="post">
        <div className="post_header">
        <Avatar className="post_avatar"
        alr="Avatar"
        src={props.avatarUrl} />
        <h3>{props.userName}</h3>
        </div>
        {/* header -> avatar + username*/}
        <img className="post_image" src={props.imageUrl} alt="alternate image"/>
        {/* image */}

       <h4 className='post_text'><strong>{props.userName} </strong>{props.captionText}</h4>
        {/* username + caption  */}

        <div className='post_comments'>
           {comments.map((commentt)=>(
             <p>
               <b><strong>{commentt.username}</strong>  </b>{commentt.text}
             </p>
           ))
           }
        </div>
        {props.userR && (
                  <form className='post_commentBox'>
          <input className='post_input' type="text" placeholder='add a comment...' value={comment} onChange={(e)=> setComment(e.target.value)} />
          <Button className="post_button" disabled={!comment} type="submit" onClick={postComment}>
         Post
      </Button>
        </form>)}

    </div>
  )
}

export default Post;