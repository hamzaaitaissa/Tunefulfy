import React from "react";
import { GiGuitar } from "react-icons/gi";
import Image from "next/image";
import type { ApiResponse, CurrentAlbum, ImageProps } from "./types/type";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { TbWorldSearch } from "react-icons/tb";
import { motion } from "framer-motion";
import { LiaDrumSolid } from "react-icons/lia";
type AlbumProps = {
  currentAlbum: CurrentAlbum | undefined;
};

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const scale_variants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };

const transition = {
  duration: 0.5,
};

const AlbumDetailMobile = ({ currentAlbum }: AlbumProps) => {
  return (
    <section className="flex lg:flex-row md:flex-row flex-col w-full h-[35rem] justify-center items-center mx-auto gap-2">
      <div className="w-full h-full relative">
        <Image
          src={currentAlbum!.images[0].url}
          alt=""
          layout="fill"
          objectFit="cover"
          className="w-full h-[640px] rounded-lg"
        />
        <div
          className="overlay absolute top-0 right-0 left-0 w-full h-full bg-[#191414]  
        flex flex-col items-center justify-between bg-opacity-70 py-7 px-5"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ ...variants, hidden: { opacity: 0, y: -50 } }}
            transition={{ ...transition, delay: 0 }}
            className="w-full self-start"
          >
            <h1 className="text-4xl justify-start items-start text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-[#b3b3b3] font-extrabold">
              {currentAlbum?.name}
            </h1>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scale_variants}
            transition={{ ...transition, delay: 0.5 }}
            className="w-full text-center flex flex-col items-center justify-center space-y-3"
          >
            <div className="flex items-center justify-center space-x-3">
              <p className="text-2xl">{currentAlbum?.artist}</p>
            </div>
            <div>
              <p>{currentAlbum?.releaseDate}</p>
            </div>
            <div className="flex w-full items-center justify-center gap-2 flex-wrap">
              {currentAlbum!.genres.map((genre) => {
                return (
                  <div
                    key={genre}
                    className="flex flex-col items-center justify-center text-center text-sm w-fit h-8 rounded-3xl px-4 py-2 bg-[#535353] text-[#f2f2f2] "
                  >
                    <p className="text-center">
                      {genre.toString().toUpperCase()}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex flex-col items-center justify-center ">
            <a target="blank" href={currentAlbum?.wikipediaUrl}>
              <TbWorldSearch className="inline w-[30px] h-[30px]" />
            </a>
            </div>
          </motion.div>

          <div className="w-full flex flex-row justify-center items-center gap-x-7 self-end">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ...transition, delay: 0.8 }}
            >
              <a
                target="blank"
                href={`https://music.apple.com/us/album/${currentAlbum?.appleMusicId}`}
              >
                <SiApplemusic className="w-[50px] h-[50px]" />
              </a>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ...transition, delay: 1 }}
            >
              <a
                target="blank"
                href={`https://www.youtube.com/watch?v=${currentAlbum?.youtubeMusicId}`}
              >
                <FaYoutube className="w-[50px] h-[50px]" />
              </a>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ...transition, delay: 1.2 }}
            >
              <a
                target="blank"
                href={`https://open.spotify.com/album/${currentAlbum?.spotifyId}`}
              >
                <FaSpotify className="w-[50px] h-[50px]" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumDetailMobile;
