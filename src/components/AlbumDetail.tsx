import React from "react";
import { GiGuitar } from "react-icons/gi";
import Image from "next/image";
import type { ApiResponse, CurrentAlbum, ImageProps } from "./types/type";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { TbWorldSearch } from "react-icons/tb";
import { LiaDrumSolid } from "react-icons/lia";
import { motion } from "framer-motion";

type AlbumProps = {
  currentAlbum: CurrentAlbum | undefined;
};

const AlbumDetail = ({ currentAlbum }: AlbumProps) => {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const transition = {
    duration: 0.5,
  };

  return (
    <section className="flex lg:flex-row md:flex-row flex-col w-full h-[35rem] justify-center items-center mx-auto gap-2">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ...transition, delay: 0 }}
        className="lg:w-[60%] md:w-[60%] w-full h-full relative"
      >
        <Image
          src={currentAlbum!.images[0].url}
          alt=""
          layout="fill"
          objectFit="cover"
          className="w-full h-full rounded-lg"
        />
      </motion.div>
      <div className="lg:w-[40%] md:w-[40%] w-full h-full flex flex-col space-y-3 justify-between items-center pl-5 gap-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ ...transition, delay: 0.8 }}
          className="w-full "
        >
          <h2 className="text text-5xl font-bold">{currentAlbum!.name}</h2>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ ...transition, delay: 1 }}
          className="w-full flex flex-row justify-start items-center space-x-1"
        >
          <h2 className="text- text-3xl">{currentAlbum!.artist}</h2>

        </motion.div>
        <div className="w-full flex flex-col justify-start ">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 1.2 }}
            className="flex justify-start items-start gap-2 w-full flex-wrap"
          >
            {currentAlbum!.genres.map((genre) => {
              return (
                <div
                  key={genre}
                  className="flex flex-col items-center justify-center text-center text-sm w-fit h-8 rounded-3xl px-4 py-2 bg-[#1db954] text-[#f2f2f2] "
                >
                  <p className="text-center">{genre.toString().toUpperCase()}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ ...transition, delay: 1.4 }}
          className="w-full flex flex-row justify-start items-center gap-x-5 "
        >
          <div>
            <a
              target="blank"
              href={`https://open.spotify.com/album/${currentAlbum?.spotifyId}`}
            >
              <FaSpotify className="w-[50px] h-[50px]" />
            </a>
          </div>
          <div>
            <a
              target="blank"
              href={`https://music.apple.com/us/album/${currentAlbum?.appleMusicId}`}
            >
              <SiApplemusic className="w-[50px] h-[50px]" />
            </a>
          </div>
          <div>
            <a
              target="blank"
              href={`https://www.youtube.com/watch?v=${currentAlbum?.youtubeMusicId}`}
            >
              <FaYoutube className="w-[50px] h-[50px]" />
            </a>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ ...transition, delay: 1.6 }}
          className="w-full flex "
        >
          <p className="text-xs text-[#f2f2f2]">
            Released in {currentAlbum!.releaseDate}. Find out more{" "}
            <a target="blank" href={currentAlbum?.wikipediaUrl}>
              <TbWorldSearch className="inline w-[20px] h-[20px]" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AlbumDetail;
