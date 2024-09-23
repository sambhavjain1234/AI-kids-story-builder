// import { NextRequest, NextResponse } from "next/server";
// import Replicate from "replicate";

// export async function POST(req:NextRequest){

//     const data=await req.json();
//     const {prompt}=data;
// const replicate = new Replicate({
//     auth:process.env.REPLICATE_API_KEY
// });

// const input = {
//     prompt: prompt,
//     output_formate:'png',
//     aspect_ratio: "1:1",
//     "output_quality":80
// };

// const output:any = await replicate.run("levelsio/san-andreas:61cdb2f6a8f234ea9ca3cce88d5454f9b951f93619f5f353a331407f4a05a314", { input });
// console.log(output)
//     return NextResponse.json({"imageUrl":output[0]})
// }