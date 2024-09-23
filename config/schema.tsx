import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const StoryData=pgTable('StoryData',{
id:serial('id').primaryKey(),
storyId:varchar('storyId'),
StorySubject:text('storySubject'),
storyType:varchar('storyType'),
ageGroup:varchar('ageGroup'),
imageStyle:varchar('imageStyle'),
output:json('output'),
coverImage:varchar('coverImage'),
userEmail:varchar('userEmail'),
userName:varchar('userName'),
userImage:varchar('userImage')

})

export const Users = pgTable ('users',{
    id:serial('id').primaryKey(),
    userName:varchar('userName'),
    userEmail:varchar('userEmail'),
    userImage:varchar('userImage'),
    credit:integer('credits').default(3)
})
