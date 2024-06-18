'use client';
import dynamic from 'next/dynamic'

import React, { use } from 'react';
import { Button } from '../../components/ui/button';
import { Mic } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from '../../utils/GeminiAIModal';
import { db } from '../../utils/db';
import { UserAnswers } from '../../utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import Webcam from 'react-webcam';
import { set } from 'react-hook-form';


function RecordAnswer({ activeQuestion, userAnswer, setUserAnswer, mockInterviewQuestion, params }) {
  const { user } = useUser();
  const { error, interimResult, isRecording, results, setResults, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  React.useEffect(() => {
    if (!isRecording && userAnswer.length > 1) {
      updateToDb();
    }
  }, [userAnswer]);

  React.useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
    clearText();
  }, [results]);

  const clearText = () => {
    stopSpeechToText();
  };

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      
    } else {
      
      startSpeechToText();
    }
  };

  const updateToDb = async () => {
    console.log('User Answer:', userAnswer);
    const feedbackPrompt =
      `Question: ${mockInterviewQuestion[activeQuestion].question}, Answer: ${userAnswer}. Depending on this question and answer for the given interview question, please give a rating out of 5 for the answer and feedback as an area of improvement. In just 3 to 5 lines to improve it and reply with JSON format with a rating field and feedback field.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      console.log(feedbackPrompt);
      const mockJsonResp = result.response.text();
      const JsonFeedbackResponse = JSON.parse(mockJsonResp.replace(/```json|```/g, ''));
      if (JsonFeedbackResponse) {
        const resp = await db.insert(UserAnswers).values({
          mockIdRef: params,
          userAns: userAnswer,
          question: mockInterviewQuestion[activeQuestion]?.question,
          correctAnswer: mockInterviewQuestion[activeQuestion]?.answer,
          feedback: JsonFeedbackResponse?.feedback,
          rating: JsonFeedbackResponse?.rating,
          userEmail: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        });

        if (resp) {
          clearText();
          setUserAnswer('');
          setResults([])
        }
      }
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  return (
    <div className='record'>
      <div>
        <Webcam
          style={{
            width: '100%',
            height: 300,
          }}
          mirrored
        />
      </div>
      <div className='new--button'>
        <Button onClick={startStopRecording}>
          {isRecording ? (
            <h2 className='flex'>
              <Mic /> Stop Recording
            </h2>
          ) : (
            'Record Answer'
          )}
        </Button>
        <Button onClick={() => console.log('User Answer:', userAnswer)}>Show User Answer</Button>
      </div>
    </div>
  );
}

export default RecordAnswer;
