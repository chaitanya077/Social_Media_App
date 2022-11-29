import { Button } from "@mui/material";
import { useState } from "react";
import {db, colRef, auth, storage} from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc , serverTimestamp} from "firebase/firestore"; 
import { FirebaseError } from "firebase/app";
import "../styles/Imageupload.css";
const ImageUpload = (props)=>{
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setprogress] = useState(0);

    
    
    const handleUpload =(e)=>{
        console.log("clicked")
        const metadata = {
            contentType: 'image/jpeg'
          };
        // let f = e.target.files[0];
        let fileRef=  ref(storage,`images/${image.name}`);
        const uploadTask = uploadBytesResumable(fileRef,image,metadata);

        uploadTask.on("state_changed",(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
            setprogress(progress);
        },(err)=>{
            alert(err.message)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl)=>{
                console.log("file is at this location",downloadUrl);
                //we want to post the image inside the database 
                const docRef = await addDoc(colRef,{
                timestamp: serverTimestamp(),
                caption: caption,
                imageUrl: downloadUrl,
                username: props.username
                });

                setprogress(0);
                setCaption("");
                setImage(null);
            })
        }
        );
    }
    const handleChange =(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
        // console.log("this")
    }
;    return(
    <div className="mainn_image_Upload">
        <div className="image_upload">
 {/* i want to have the following things in the app */}
      {/* caption input 
      file picker 
    post button */}
      {/* <h1>imageupload</h1> */}
      <progress className="image_Upload_progress" value={progress} max="100"/>
      {/* <h2>{`${progress}%`}</h2> */}
      <input type="text" placeholder="enter a caption..." onChange={(e)=> setCaption(e.target.value)} onValue={caption} className="form-control"/>
      <Button>
      <input type="file" className="input_button form-control" onChange={handleChange}/>
      </Button>
      <Button onClick={handleUpload}>
         upload
      </Button>
        </div>
    </div>
    )

}

export default ImageUpload;