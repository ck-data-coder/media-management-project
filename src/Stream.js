import React, { useEffect } from 'react'
import { useRef, useState } from "react";
import axios from "axios";
import Header from './Header';
import './css/stream.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Stream = () => {
  const navigate=useNavigate()
    const token = localStorage.getItem('token');
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [datainfo,setDataInfo]=useState({
      productTitle:'',
      description:'',
      category:''

    })
    const [uploadvisible,setUploadVisible]=useState(true)
    const [category,setCategory]=useState()



    async function getCategories() {
      await axios.get("http://localhost:8080/getcategoriesnames", {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
     
    }).then((res)=>{
      setCategory(res.data)
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    }

    useEffect(()=>{
       getCategories()
    },[])

   useEffect(()=>{
    if(datainfo.productTitle ==''  || (datainfo.category=="--Select--") || datainfo.category==''){
      setUploadVisible(true)
    }
    else setUploadVisible(false)

    console.log(uploadvisible)
   },[datainfo])

    function productOnChange(e){
      setDataInfo({...datainfo,[e.target.name]:e.target.value});
     
    }

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
    
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/mp4" });
        const chunks = [];
    
        mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "video/mp4" });
          setVideoBlob(blob);
        };
    
        mediaRecorderRef.current.start();
        setRecording(true);
      };
      
      const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setRecording(false);
      };

      const uploadVideo = async () => {
        if (!videoBlob) return;
    
        const formData = new FormData();
        formData.append("imageFile", videoBlob, `${Date.now()}-recording.mp4`);
        formData.append("productTitle", datainfo.productTitle);
    formData.append("description", datainfo.description);
    formData.append('category',datainfo.category)
        await axios.post("http://localhost:8080/addproduct", formData, {
          headers: { "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`,
           },
         
        });
    
        toast.success("Video uploaded successfully!");
        navigate('/home')
      };

  return (
  <>
  <Header></Header>
  <div className='stream-container'>
      <video ref={videoRef} autoPlay className='video-stream' ></video>
      <button onClick={recording ? stopRecording : startRecording} className='recording-button'>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {
        <>
          <label htmlFor='productTitle' className='adjustposition'>Video Title: </label>
       <input type='text' onChange={productOnChange} value={datainfo.productTitle} id='productTitle' name='productTitle' required></input>
     
       <label htmlFor='description' className='desc adjustposition'>Description:</label>
        <textarea id='description' onChange={productOnChange} value={datainfo.description} name='description' ></textarea>
       
        <lable htmlFor='category' className='checkbox-radio'>Select Category:</lable>
        <select
            onChange={productOnChange}
            type="text"
            className='checkbox-radio'
            value={datainfo.category}
            name="category"
            id="category"
            placeholder="category"
            required
          >
               <option value={null}>--Select--</option>
            {category
              ?
               category.map((e) => {
                  return <option value={e}>{e}</option>;
                })
              : null}
          </select>
        </>
      }
      {videoBlob && <button className='upload-data' onClick={uploadVideo} disabled={uploadvisible} >Upload Video</button>}
    </div>
  </>
  )
}

export default Stream;