"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import animationData from "../../public/loading.json";
import Lottie from "lottie-react";
import type { ApiResponse, CurrentAlbum } from "../components/types/type";
import AlbumDetail from "@/components/AlbumDetail";
import HomePage from "@/components/HomePage";
import AlbumDetailMobile from "@/components/AlbumDetailMobile";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [recievedAlbum, setRecievedAlbum] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<CurrentAlbum | undefined>(
    undefined
  );

  //to clear localstorage at 6am
  function clearLocalStorageAt6AM() {
    const lastGeneratedString = localStorage.getItem("lastGenerated");

    if (lastGeneratedString) {
      const lastGenerated = new Date(lastGeneratedString);
      const today = new Date();
      const today6AM = new Date(today);
      today6AM.setHours(6, 0, 0, 0);

      if (today.getDay() > lastGenerated.getDay()) {
        if (today.getUTCHours() >= 6) {
          localStorage.removeItem("lastGenerated");
          localStorage.removeItem("cachedAlbum");
        }
      }
    }
  }

  //to get cached ALBUM
  const getCachedAlbum = (): CurrentAlbum | null => {
    const cachedData = localStorage.getItem("cachedAlbum");
    if (cachedData) {
      setRecievedAlbum(true);
      return JSON.parse(cachedData);
    }
    return null;
  };

  function canGenerateAlbum() {
    const lastGenerated = localStorage.getItem("lastGenerated");
    if (!lastGenerated) {
      return true;
    }
    const lastGeneratedDate = new Date(lastGenerated);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > lastGeneratedDate && today.getHours() > 3;
  }

  const generate = async () => {
    if (canGenerateAlbum()) {
      try {
        setLoading(true);
        const response: ApiResponse = await axios.get("/api/generateAlbum");

        if (response) {
          setCurrentAlbum(response.data);
          const today = new Date().toISOString();
          localStorage.setItem("lastGenerated", today);
          localStorage.setItem("cachedAlbum", JSON.stringify(response.data));
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
    } else {
      setRecievedAlbum(true);
      console.log("album recieved");
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //resizing
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // Change the width condition as needed
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    clearLocalStorageAt6AM();
    // If we have a cached album and it's not recieved from the api yet then use that one instead of fetching again
    const cachedAlbum: CurrentAlbum | null = getCachedAlbum();
    if (cachedAlbum) {
      console.log(cachedAlbum);
      setCurrentAlbum(cachedAlbum as CurrentAlbum);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main
      className={` mx-auto flex min-h-[100vh] ${
        recievedAlbum ? "flex-row justify-center items-center" : "flex-col"
      }  max-w-5xl gap-4 px-4 py-6 xl:px-0`}
    >
      {loading ? (
        <>
          <Lottie animationData={animationData} style={{ height: 600 }} />
        </>
      ) : !recievedAlbum ? (
        <>
          <HomePage onClick={generate} isMobile={isMobile} />
        </>
      ) : !isMobile ? (
        <AlbumDetail currentAlbum={currentAlbum} />
      ) : (
        <AlbumDetailMobile currentAlbum={currentAlbum} />
      )}
    </main>
  );
}
