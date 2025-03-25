"use client";

import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        fill
        priority
        alt="Rentiful Hero Image"
        className="object-cover object-center"
        src="/landing-splash.jpg"
      />
      <div className="absolute inset-0 bg-black opacity-60" />
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
        className="absolute top-1/3 transform -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Start your journey to finding the perfect place to call home
          </h1>
          <p className="text-xl text-white mb-8">
            Explore our wide range of rental properties tailored to fit your lifestyle and needs!
            match
          </p>
          <div className="flex justify-center ">
            <Input
              type="text"
              value="search query for now"
              placeholder="Search by city, neighborhood, or address"
              className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
              onChange={() => {}}
            />
            <Button
              className="rounded-none rounded-r-xl border-none text-white bg-secondary-600 hover:bg-secondary-500 h-12 cursor-pointer"
              onClick={() => {}}
            >
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
