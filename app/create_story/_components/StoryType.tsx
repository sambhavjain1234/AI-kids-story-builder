"use client"
import { Image } from '@nextui-org/react'
import React, { useState } from 'react'

export interface OptionField{
    label : string,
    imageUrl : string,
    isFree:boolean
}

function StoryType({userSelection}:any) {
    const OptionList =[
        {
            label:'Story book',
            imageUrl:'./story.png',   
            isFree:true
        }, {
            label:'Bed book',
            imageUrl:'./bedstory.png',
            isFree:true
        }, {
            label:'Educatioanl book',
            imageUrl:'./educational.png',
            isFree:true
        }
    ]
 
    const [selectedOption,setSelectedOption]= useState<string>();


        const onUserSelect =(item:OptionField)=> {
                setSelectedOption (item.label);
                userSelection({
                    fieldValue:item?.label,
                    fieldName:"storyType"
                })
        }
  return (
    <div>
        <label className='font-bold text-4xl text-primary'>2. Story type</label>
       <div className='grid grid-cols-3 gap-5 mt-3 '>
        {OptionList.map((item,index)=>(
            <div className={`grayscale hover:grayscale-0 cursor-pointer p-1 relative ${selectedOption ==item.label?'grayscale-0 border-2 rounded-3xl border-primary':'grayscale'}`


            } onClick={()=>onUserSelect(item)}>
               
               <div className=' relative '>
                <h2 className='text-2xl bottom-5 text-white text-center w-full absolute z-30'>{item.label}</h2>
               <Image src={item.imageUrl} alt={item.label}
                width={300} height={300}
                className='object-cover h-[260px] rounded-3xl '
                /> 
                </div>

            </div>
        ))}
       </div>
       
        </div>
  )
}

export default StoryType