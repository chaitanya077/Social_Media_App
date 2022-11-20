import {  useEffect, useState } from 'react';
import './App.css';
import Post from './component/Post';
import {colRef, db , auth} from './firebase'
import { getFirestore , getDocs , onSnapshot, collection, CollectionReference} from "firebase/firestore";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { flexbox } from '@mui/system';
import Input from '@mui/material/Input';
import {getAuth , createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword} from "firebase/auth";
import ImageUpload from './component/ImageUpload';
import { query, orderBy, limit } from "firebase/firestore";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // height:200
};


function App() {
  const [user,setUser] = useState(() => auth.currentUser || undefined);
  const [ posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState(user ? user.displayName : null);
  const [password,setPassword] = useState("");
  const [openSignIn,setOpenSignIn] = useState(false);
  
  // {imageUrl:"https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  //  avatarUrl: "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  //   userName:"1st" ,
  //   captionText:"caption1" },
  
  //  console.log(auth)
  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(authUser)=>{
        console.log(authUser) 
        if(authUser){
          //user has logged in 
          console.log(authUser);
          setUser(authUser);
          // we need to update at the time of making a new user
          // if(authUser.displayName){
            //    console.log(auth.displayName);
            // }else{
              //   // if we just created someone 
              //   updateProfile(auth.currentUser,{
                //     displayName:username
                //    }).then(()=>{
                  //     console.log("profile updated")
                  //    }).catch(err => err.message);      
                  // }
                  // this was not working with the createuseremailandpassword
                  updateProfile(auth.currentUser,{
                    displayName:username
                  }).then(()=>{
                    console.log("profile updated")
                  }).catch(err => err.message);     
                  
                }else{
                  setUser(null);
                  // user has logged out
                }
              })
              
              
              return ()=>{
                //perform some cleanup actions before you refire the useeffect 
                unsubscribe();
              }
    },[user,username]);
    
    // console.log(user.displayName)
    useEffect(()=>{
      // i will use order by after sometime
      onSnapshot(colRef, (snapshot)=>{
      let postss = [];
      snapshot.docs.map(doc =>(
       postss.push({...doc.data(), id: doc.id})
      //  postss.push(doc.data())
      ))
      setPosts(postss)
      // console.log(postss[0].id);
  })
     },[])

     // to sign up the new users

     const signUp =(e)=>{
       e.preventDefault();
      //  this createUserWithEmailAndPassword is asynchronous so we will use this with .then as it takes sometime to do and returns a proimse
       createUserWithEmailAndPassword(auth , email , password).then((cred)=>{
        // return cred.user.updateProfile(auth.currentUser,{
        //    displayName:username
        // })
        console.log(cred.user.displayName);
       }).catch(err => alert(err.message));
       setOpen(false);
     }
    //  console.log("this is the main");

// to signin the existing users 
const signIn = (e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password).then((cresUser)=>{
     console.log(cresUser.user);
     console.log(cresUser.user.displayName)
     cresUser.user.displayName = username;
  }).catch(err=> err.message);

  setOpenSignIn(false);
}


  return (
    <div className="App">
     {/* we will render this component only when the user is logged in */} 
    <div className='app_header'>
      <img className="app_headerImage" src="https://image.shutterstock.com/image-photo/bangkok-thailand-may-14-2016-260nw-435629701.jpg" alt="insta logo"/>
        {/* //conditional rendering  */}
      <div> 
        {user
        ? (<Button onClick={()=> signOut(auth)}>{user.displayName}</Button>)
        :( <div className='app_loginContainer'>
          <Button onClick={()=>setOpenSignIn(true)}>Sign IN</Button>
          <Button onClick={()=>setOpen(true)}>Sign up</Button>
        </div>)
      }
      <div className="app_modal1">
<Modal
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='app_signup'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        <center>
        <img style={{width:"20%"}} src="https://image.shutterstock.com/image-photo/bangkok-thailand-may-14-2016-260nw-435629701.jpg" alt="insta logo"/>
        </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Input type="text" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
             </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Button type='submit' onClick={signUp}>Login</Button>
             </center>
          </Typography>
          </form>
        </Box>
      </Modal>
      </div>
      <div className="app_modal2">
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='app_signup'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        <center>
        <img style={{width:"20%"}} src="https://image.shutterstock.com/image-photo/bangkok-thailand-may-14-2016-260nw-435629701.jpg" alt="insta logo"/>
        </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <center>
             <Button type='submit' onClick={signIn}>SIGN IN</Button>
             </center>
          </Typography>
          </form>
        </Box>
      </Modal>
      </div>
      </div>
    </div>
    <div className="app_posts">
    {
      posts.map((post)=>(
        <Post key={post.id} postId={post.id} userR={user} imageUrl={post.imageUrl} avatarUrl={post.avatarUrl} userName={post.username} captionText={post.caption}/>
      ))
    }

    </div>
      {/* firebase offers something called as cloud functions and it is written in node js */}
      {/* firebase gives us real time database */}
      {(user) ? 
     <ImageUpload username={username} className="image_container"/>:
     <h3>Need To LOGIN FIRST</h3>}
     <div style={{height:"7rem", width:"100%"}}>
     </div>
     </div>
  );
}

export default App;
