"use client";
import { useState, useEffect, useActionState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { confirmFoundItem } from "@/app/(app)/_actions/confirmationAction";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_R2_S3_DEV_URL;

export const TimeLocation = ({ date, place }) => {
  const timeframe = moment(date).format("DD MMMM YYYY");
  return (
    <p>
      {timeframe} - {place}
    </p>
  );
};

export const Item = ({ item, match }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [success, formAction, isLoading] = useActionState(
    confirmFoundItem,
    null
  );
  const foundItem = match?.foundItem;
  const score = match?.score * 100 || 0;

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

  useEffect(() => {
    if (success) {
      redirect("/my-items");
    }
  }, [success]);

  return (
    <div className="w-1/2 mx-auto grid grid-cols-3 pt-8 pb-24 gap-6">
      <div className="col-span-2 flex flex-col">
        <div className="flex space-x-3 items-center">
          <div className="relative w-[200px] h-auto overflow-hidden">
            {item.images.length > 0 ? (
              <img
                src={`${BASE_URL}/${item.id}/${item.images[0].url}`}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-lg object-contain w-full h-full"
              />
            ) : (
              <div className="bg-slate-300 rounded-lg w-full h-full"></div>
            )}
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">{item.name}</h1>
            <TimeLocation date={item.timeframe} place={item.location} />
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
            {stage === 2 && (
              <p className="mt-2">
                ✅ Match found! Similarity Score: {score.toFixed(2)}%
              </p>
            )}
          </div>
        ) : (
          <p>No match item</p>
        )}

        {stage === 2 && foundItem && (
          <motion.div
            className="flex space-x-3 items-center opacity-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative w-[200px] h-auto overflow-hidden">
              {foundItem.images.length > 0 ? (
                <img
                  src={`${BASE_URL}/${foundItem.id}/${foundItem.images[0].url}`}
                  alt={foundItem.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-contain w-full h-full"
                />
              ) : (
                <div className="bg-slate-300 rounded-lg w-full h-full"></div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-center">
                {foundItem.name}
              </h1>
              <TimeLocation
                date={foundItem.timeframe}
                place={foundItem.location}
              />
            </div>
          </motion.div>
        )}
      </div>
      {stage === 2 && foundItem && (
        <form
          action={formAction}
          className="flex flex-col border w-72 py-4 px-3 h-fit rounded-xl gap-3"
        >
          <div className="text-2xl font-sans font-semibold">Confirmation</div>
          <Input name="matchId" value={match.id} className="hidden" />
          <Select
            className="max-w-xs"
            name="confirmation"
            label="Is it your item?"
            isRequired
          >
            <SelectItem key="confirm" color="primary">
              Confirm Match
            </SelectItem>
            <SelectItem key="reject" color="danger">
              Not My Item
            </SelectItem>
          </Select>
          <Button color="primary" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
