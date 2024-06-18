import { varchar, serial, text, pgTable} from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mock_interviews' ,{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:text('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
})


export const UserAnswers = pgTable('user_answers' ,{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId'),
    question:varchar('question'),
    correctAnswer:varchar('correctAnswer'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    createdAt:varchar('createdAt'),
    userEmail:varchar('userEmail'),
   
})