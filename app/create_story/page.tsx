"use client"
import React, { useContext, useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
import {useUser} from '@clerk/nextjs'

//@ts-ignore
import uuid4 from "uuid4"
import CustomLoader from './_components/CustomLoader'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {UserDetailContext} from '../_context/UserDetailContext'
import { eq } from 'drizzle-orm'
const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT
const recoredId=uuid4();

export interface fieldData {
  fieldName:string,
  fieldValue:string
}
export interface formDataType{
  storySubject:string ,
  storyType:string ,
  imageStyle:string ,
  ageGroup:string,

}

function CreateStory() {
  const [formData , setFormData]=useState<formDataType>();
const [loading,setLoading]=useState(false);
const router=useRouter();
const notify = (msg:string) => toast(msg);
const notifyError=(msg:string) => toast(msg);
const {user}=useUser();
const {userDetail,setUserDetail}=useContext(UserDetailContext)
/**
 * used to add data to form
 * @param data 
 */


  const onHandleUserSelection=(data:fieldData)=>{
  setFormData((prev:any)=>({
  ...prev,
  [data.fieldName]:data.fieldValue
}));
console.log(formData);
  }
const GenerateStory=async()=>{

  if(userDetail.credit<=0){
    notifyError('You dont have enough credits!!');
    notifyError('You dont have enough credits!!');
    notifyError('You dont have enough credits!!');
    notifyError('You dont have enough credits!!');

    return;
  }
   setLoading(true)
  const FINAL_PROMPT=CREATE_STORY_PROMPT
  ?.replace('{ageGroup}',formData?.ageGroup??'')
  .replace('{storyType}',formData?.storyType??'')
  .replace('{storySubject}',formData?.storySubject??'')
  .replace('{imageStyle}',formData?.imageStyle??'')

//Generate Ai story
try{
  const result =await chatSession.sendMessage(FINAL_PROMPT);
  const story =JSON.parse(result?.response.text());
  // const imageResp=await axios.post('/api/generate-image',{
  //   prompt:'Add text with title'+story?.story?.title +" in bold text for book cover"+story?.story?.description
  // })

  //console.log(imageResp?.data?.imageUrl);
  const imageUrl=('./pixel.png')
   const resp=await SaveInDB(result?.response.text(),"./pixel.png");
   console.log(story);
     router?.replace('/view-story/'+ recoredId);
     notify("story generated")
     await UpdateUserCredit();
  setLoading(false);
}catch(e){
  console.log(e)
  setLoading(false);
}

//Save to DB




//Generate Image
}


const SaveInDB=async(output:string,imageUrl:string)=>{
    setLoading(true)
    try{
    const result=await db.insert(StoryData).values({
    storyId:recoredId,
    ageGroup:formData?.ageGroup,
    imageStyle:formData?.imageStyle,
    storyType:formData?.storyType,
    StorySubject:formData?.storySubject,
    output:JSON.parse(output),
    coverImage:imageUrl,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    userImage:user?.imageUrl,
    userName:user?.fullName
    }).returning({storyId:StoryData?.storyId})
    setLoading(false);
    return result;
}
catch(e){
setLoading(false)
}

}
const UpdateUserCredit=async()=>{
  const result=await db.update(Users).set({
     credit:Number(userDetail?.credit-1)

  }).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
  .returning({id:Users.id})
}
  return (
    <div className='p-10 md:px-20 lg:px-40'>
    <h2 className='font-extrabold text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
    <p className='text-2xl text-primary text-center'>unlock your cretivity with AI: Craft stories like never before ! Let our AI bring your imagination to life , one story at a time.</p>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
      {/* story subject */}

       <StorySubjectInput userSelection={onHandleUserSelection}/>

        {/* story type */}
          <StoryType userSelection={onHandleUserSelection}/>

        {/* Age group */}
         <AgeGroup userSelection={onHandleUserSelection} />

           {/* Image Style */}

           <ImageStyle userSelection={onHandleUserSelection}/>
    </div>
    <div className='flex justify-end my-10 flex-col items-end'>
    <Button color='primary' 
    disabled={loading}
    className='p-10 text-2xl'
    onClick={GenerateStory}>
      GenerateStory</Button>
      <span className='text-black'>1 credit per story</span>
    </div>
    <CustomLoader isLoading={loading}/>
    </div>
    )
}

export default CreateStory