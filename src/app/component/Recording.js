'use client';
import './Recording.css'
import './wave.css'
import React, { Component } from 'react'
import { useState } from 'react'
// import './recordButton.js'
import './recordingUtil.js';
import './mobile.css'


function Recording() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className='recording'>
        <div className='mic'>
          <div className='recordSection'>
            <div className='recordCircle'>
              <img className='record' src='https://www.pngitem.com/pimgs/m/500-5006822_mic-speaker-vocal-audio-record-recorder-ios-voice.png' alt='Girl in a jacket' width='100' height='100' onClick={() => setShow(true)} />
            </div>
          </div>
          <button className='stop' onClick={() => setShow(false)}>stop</button>
        </div>

        <div className='wavebox'>

          {
            show &&
            <div className="boxContainer">
              <div className="box box1"></div>
              <div className="box box2"></div>
              <div className="box box3"></div>
              <div className="box box4"></div>
              <div className="box box5"></div>
            </div>
          }
        </div>
        <section className="sound-clips">
          {/* <article class="clip">
            <audio controls></audio>
            <p>your clip name</p>
            <button>Delete</button>
          </article> */}

        </section>


      </div>
    </>

  )
}

export default Recording





// const handelWave = ()=>{
//     let x = document.getElementsByClassName('recordingMic');
//   if (x.style.display === 'none') {
//     x.style.display = 'block';
//   } else {
//     x.style.display = 'none';
//   }
// }



