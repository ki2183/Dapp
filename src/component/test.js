import axios from "axios"
import "./test.css"
import { useState,useEffect, useRef } from "react"

function Test(){
  const [img,setImg] = useState(null)
  const [test,setTest] = useState(null);
  const [ig,setig] = useState(null);
  const num = 4205
  const [a,setA] = useState(null)

  const input = (event) => {
    const data = event.target.value;
    setImg(data);
    console.log(img);
  };

  const submit= () =>{
    console.log("aa")
    axios.get('/reviews')
    .then(res=>{
      console.log(res.data.data)
      console.log(res.data.data[img].amazonS3s[0].filename)
      console.log(res.data.data[img].amazonS3s)
      console.log(res.data.data[img].amazonS3s[0].fileName)
      setA(res.data.data[img].amazonS3s[0].fileName)
      
    }).catch(err=>{

    })
  }

  useEffect(()=>{
    console.log('b')
    setig( <img alt="dd" src={`https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${a}`}></img> )
  },[a])


    return <div className="container-test ">
      <div className="etc"></div>
      <input type="text" onChange={input}></input>
      <button onClick={e=>{e.preventDefault(); setTest(img); submit()}}>전송</button>
      {ig}
    </div>
}

export default Test;