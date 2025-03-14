"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";

const BASE_URL = process.env.NEXT_PUBLIC_R2_S3_DEV_URL;

export const TimeLocation = ({ date, place }) => {
    const timeframe = moment(date).format("DD MMMM YYYY");
    return <p>{timeframe} - {place}</p>;
};

export const Item = ({ item, match }) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);
    const score = item.asLostItem?.[0]?.score * 100 || 0;

    useEffect(() => {
        if (item.asLostItem?.length > 0) {

            setTimeout(() => {
                setStage(1);
                
                let progressInterval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= score) {
                            clearInterval(progressInterval);
                            setStage(2);
                            return score;
                        }
                        return prev + Math.random() * 10;
                    });
                }, 200);
            }, 2000);
        }
    }, [item]);

    return (
        <div className="max-w-2xl mx-auto pt-8 pb-24 px-4 space-y-8">
            <div className="flex space-x-3 items-center">
                <div className="relative w-[200px] h-auto overflow-hidden">
                    {item.images.length > 0 ? (
                        <img
                            src={`${BASE_URL}/${item.id}/${item.images[0].url}`}
                            alt={item.name}
                            width={400}
                            height={400}
                            className="rounded-lg object-contain w-full h-full"
                        />
                    ) : (
                        <div className="bg-slate-300 rounded-lg w-full h-full"></div>
                    )}
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-center">{item.name}</h1>
                    <TimeLocation date={item.timeframe} place={item.location}/>
                </div>
            </div>


            {item.asLostItem?.length > 0 ? (
                <div className="text-lg font-semibold">
                    {stage === 0 && <p>🔍 Searching for match...</p>}
                    {stage === 1 && (
                        <>
                            <p>🔄 Matching item...</p>
                            <motion.div 
                                className="w-full bg-gray-200 rounded-full h-4 mt-2"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 2 }}
                            >
                                <motion.div 
                                    className="bg-blue-500 h-4 rounded-full" 
                                    style={{ width: `${progress}%` }}
                                />
                            </motion.div>
                        </>
                    )}
                    {stage === 2 && <p className="mt-2">✅ Match found! Similarity Score: {score.toFixed(2)}%</p>}
                </div>
            ) : (
                <p>Item Found!</p>
            )}


            {stage === 2 && match && (
                <motion.div 
                    className="flex space-x-3 items-center opacity-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="relative w-[200px] h-auto overflow-hidden">
                        {match.images.length > 0 ? (
                            <img
                                src={`${BASE_URL}/${match.id}/${match.images[0].url}`}
                                alt={match.name}
                                width={400}
                                height={400}
                                className="rounded-lg object-contain w-full h-full"
                            />
                        ) : (
                            <div className="bg-slate-300 rounded-lg w-full h-full"></div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-center">{match.name}</h1>
                        <TimeLocation date={match.timeframe} place={match.location}/>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
