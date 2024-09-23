"use client"
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';

function ViewStory({params}:any) {
    const [story,setStory]=useState<any>();
    useEffect(()=>{
    console.log(params.id);
    getStory();

    },[])

    const getStory=async()=>{
          const result=await db.select().from(StoryData)
          .where(eq(StoryData?.storyId,params.id));
         console.log(result[0]);
         setStory(result[0]);
          
    }
  return (
  <div className='p-10 md:px-20 lg:px-40 flex-col '>
    <h2 className='font-bold text-4xl text-center p-10 bg-primary text-white'>{story?.output?.story?.title}</h2>
 <div className='relative'>
   {/* @ts-ignore */}
    <HTMLFlipBook width={500} height={500}
        showCover={true} 
        className='mt-10 justify-center'
        //useMouseEvents={true}
      >
         
         
       <div>
             <BookCoverPage imageUrl={story?.coverImage}/>
          </div>
         {
            [...Array(story?.output?.story?.chapters.length)].map((item,index)=>(
               <div key={index} className='bg-white p-10 border'>
                  <StoryPages index={index} storyChapter={story?.output?.story?.chapters[index]}/>
               </div>
            ))
         }
         




        </HTMLFlipBook>
       
       
</div>
 </div>
  )
}

export default ViewStory