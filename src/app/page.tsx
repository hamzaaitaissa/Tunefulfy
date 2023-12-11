"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import generateAlbum from "../pages/api/generateAlbum";
import animationData from "../../public/loading.json";
import Lottie from "lottie-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [recievedAlbum, setRecievedAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<CurrentAlbum | null>(null);

  interface ApiResponse<T> {
    data: T;
  }
  interface AlbumImage {
    height: number;
    url: string;
    width: number;
  }

  interface CurrentAlbum {
    artist: string;
    artistOrigin: string;
    images: AlbumImage[];
    genres: string[];
    subGenres: string[];
    name: string;
    slug: string;
    releaseDate: string;
    globalReviewsUrl: string;
    wikipediaUrl: string;
    spotifyId: string;
    appleMusicId: string;
    amazonMusicId: string;
    youtubeMusicId: string;
  }

  const generate = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CurrentAlbum>("/api/generateAlbum");
      if (response) {
        setCurrentAlbum(response.data);
        setTimeout(() => {
          setRecievedAlbum(true);
          setLoading(false);
        }, 2000);
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-9 p-24">
      {loading ? (
        <>
          <Lottie animationData={animationData} />{" "}
        </>
      ) : !recievedAlbum ? (
        <>
          <span className="tracking-wider font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00bf8f] to-[#044d3c]">
            Album Every Day
          </span>
          <Button onClick={generate}>Generate</Button>
        </>
      ) : (
        <section className="grid grid-cols-3 grid-rows-4 w-full h-[50vh] gap-2  ">
          <div className=" relative col-span-1 row-span-4 flex items-center justify-center">
            {currentAlbum.images &&
              currentAlbum.images.length > 0 &&
              currentAlbum.images[0].url && (
                <Image
                  src={currentAlbum.images[0].url}
                  alt="Your Image"
                  fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className="rounded-lg object-cover object-top"
                />
              )}
          </div>
          <div className="col-span-2 row-span-1 flex justify-start px-10 items-center">
                <p className="center text-8xl font-bold text-gray-700 dark:text-white">
                  {currentAlbum.name}
                </p>
          </div>
          <div className="col-span-2 row-span-2 flex justify-start px-10 items-center">
                <p className="center text-2xl font-bold text-gray-700 dark:text-white">
                  Artist: {currentAlbum.artist}
                </p>
          </div>
          <div className="col-span-2 row-span-3 flex justify-start px-10 items-center">
            {currentAlbum?.genres.map(genre=>(
              <div key={genre} className=" mx-3 w-auto h-[20px] rounded-[30px] bg-lime-600 text-white text-base px-3 py-3 flex justify-center items-center">{genre}</div>

            ))}
                
          </div>
        </section>
      )}
    </main>
  );
}
