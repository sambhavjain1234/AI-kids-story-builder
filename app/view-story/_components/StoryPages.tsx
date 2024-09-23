import React from 'react'
import { CgPlayButtonO } from "react-icons/cg";

function StoryPages({index ,storyChapter}:any) {

  const playSpeech=(text:string)=>{
const synth=window?.speechSynthesis;
const textToSpeech=new SpeechSynthesisUtterance(text);
synth.speak(textToSpeech)
  }
  return (
    <div>
        <h2 className='text-2xl font-bold text-primary flex justify-between'>{index+1}. {storyChapter?.title}
        <span className='text-3xl cursor-pointer' onClick={()=>playSpeech(storyChapter?.text)}><CgPlayButtonO />
        </span></h2>
        <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100 text-black'>{storyChapter?.text}</p>
    </div>
  )
}

export default StoryPages