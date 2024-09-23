import { Image } from '@nextui-org/react';
import React, { useState } from 'react'
import { OptionField } from './StoryType';

function ImageStyle({userSelection}:any) {
    const OptionList =[
        {
            label:'3-D Cartoons',
            imageUrl:'./3D.png',   
            isFree:true
        }, {
            label:'Paper Cut',
            imageUrl:'./paperCut.png',
            isFree:true
        }, {
            label:'Watercolor',
            imageUrl:'./watercolor.png',
            isFree:true
        },{
            label:'Pixel style',
            imageUrl:'./pixel.png',
            isFree:true
        }
    ]

    const [selectedOption,setSelectedOption]= useState<string>();

  
    const onUserSelect =(item:OptionField)=> {
        setSelectedOption (item.label);
        userSelection({
            fieldValue:item?.label,
            fieldName:"imageStyle"
        })
}


  return (
    <div>
        <label className='font-bold text-4xl text-primary'>4.Image Styles</label>
       <div className='grid grid-cols-3 gap-5 mt-3 '>
        {OptionList.map((item,index)=>(
            <div className={`grayscale hover:grayscale-0 cursor-pointer p-1 z-0 ${selectedOption ==item.label?'grayscale-0 border-2 rounded-3xl border-primary':'grayscale'}`


            } onClick={()=>onUserSelect(item)}> 
              
              <div className=' relative '>
                <h2 className='text-2xl bottom-5 text-white text-center w-full absolute z-30'>{item.label}</h2>
               <Image src={item.imageUrl} alt={item.label}
                width={300} height={135}
                className='object-cover h-[120px] rounded-3xl '
                /> 
                </div>

            </div>
        ))}
       </div>
       
        </div>
  )
}

 

export default ImageStyle