'use client';

import React, { useState, useEffect, useRef } from "react";
import Typewriter, { Options } from 'typewriter-effect';
import { useChat } from 'ai/react';
import Image from 'next/image';
import { url } from "inspector";

export default function Chat() {

  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  const [isTyping, setIsTyping] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const element = chatHistoryRef.current;
      element.scrollTop = element.scrollHeight;
    }
  });

  const handleVideoPlayEnded = () => {
    setIsVideoLoaded(true);
  };

  const handleChatStarted = () => {
    setIsChatStarted(true);
  }

  const stopTyping = () => {
    setIsTyping(false);
  };

  return (
    <>
      <div className={`w-full h-[100vh] bg-cover bg-top flex justify-center items-center bg-[#000] ${isVideoLoaded ? 'video-animation fadeOut' : 'video-animation fadeIn'}`}>
        <video autoPlay muted loop className="absolute top-0 left-0 object-fit z-[0]">
          <source src="/videos/03.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="w-[1200px] h-[800px] bg-gradient-to-bl from-[#edb4a6] to-[#cee6fe] rounded-[50px] opacity-[95%] relative p-[40px]">
          <video
            autoPlay
            muted
            className={`absolute top-0 left-0 object-fit z-[3]`}
            onEnded={handleVideoPlayEnded}
            width={1200}
            height={675}
          >
            <source src="/videos/01.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className={`w-full h-[100vh] bg-cover bg-top flex justify-center items-center bg-[#000] ${isVideoLoaded ? 'video-animation fadeIn' : 'video-animation fadeOut'}`}>
        <video autoPlay muted loop className="absolute top-0 left-0 object-fit z-[0]">
          <source src="/videos/03.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="w-[1200px] h-[800px] bg-gradient-to-bl from-[#edb4a6] to-[#cee6fe] rounded-[50px] opacity-[95%] relative p-[40px]">
          <video
            autoPlay
            muted
            loop
            className={`absolute top-0 left-0 object-fit z-[1]`} width={1200} height={675}>
            <source src="/videos/02.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          {!isChatStarted ? (
            <>
              <div className="absolute top-[40px] left-[40px] z-[4]">
                <img src="/images/start.png" className='w-full rounded-[53px]' alt="bg" onClick={(e) => handleSubmit(e as any)} />
              </div>
              <div className="absolute bottom-[200px] left-[300px] max-w-[200px] bg-[#ff0000a8] rounded-t-[15px] rounded-l-[15px] p-[20px] z-[5]">
                <p className="text-white">Ho ho ho!</p>
                <p className="text-white">Let's Chat with me in Santa GPT!</p>
                <button className="w-full text-center bg-white mt-[15px] rounded-[5px] p-[5px]" onClick={handleChatStarted}>Click to chat</button>
              </div>
            </>
          ) : (
            <>
              <div className="absolute w-[360px] h-[600px] overflow-y-auto left-[50px] top-[100px] flex flex-col gap-[10px] px-[5px]" ref={chatHistoryRef}>
                <div className="whitespace-pre-wrap max-w-[250px] p-3 rounded-t-[20px] ms-auto me-0 bg-[#979ea7] rounded-l-[20px] text-white">
                  {isTyping ? (
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString('Well Hello Ho Ho Ho there,\nhow are you?\nWhat would you like to know?\nI guess you are curious about what gift you\'ll get?')
                          .callFunction(() => {
                            stopTyping();
                          })
                          .start();
                      }}
                      options={{
                        delay: 50
                      }}
                    />
                  ) : (
                    <>Well Hello Ho Ho Ho there,<br />
                      how are you?<br />
                      What would you like to know?<br />
                      I guess you are curious about what gift you'll get?
                    </>
                  )}
                </div>
                {messages.length > 0
                  ? messages.map(m => (
                    <div key={m.id} className={`whitespace-pre-wrap max-w-[280px] p-2 rounded-t-[20px] text-white ${m.role === 'user' ? 'ms-0 me-auto bg-[#94c8f3] rounded-r-[20px]' : 'ms-auto me-0 bg-[#979ea7] rounded-l-[20px]'}`}>
                      {m.content}
                    </div>
                  ))
                  : null}
              </div>
              <div className="w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                  <input
                    className="absolute bottom-[20px] z-[3] w-[calc(100%_-_80px)] rounded-[25px] p-3 outline-none bg-[#eee] focus:bg-[#fff]"
                    value={input}
                    placeholder="What will I get for Chrismas?"
                    onChange={handleInputChange}
                  />
                  <Image src="/images/right-arrow.png" className='absolute bottom-[30px] right-[50px] cursor-pointer z-[4]' width={30} height={30} quality={100} alt="submit" onClick={(e) => handleSubmit(e as any)} />
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
