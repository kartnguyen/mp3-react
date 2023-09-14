import { useRef, useState, useEffect } from "react";
import "./App.css";
import Player from "./components/Player";
import { GoMute, GoUnmute } from "react-icons/go";
import { Mp3context } from "./context/Mp3context";

const songs = [
  {
    id: 1,
    title: "À Lôi (Prod. By Haima X Minboo)",
    artist: "Double2T",
    img: "/public/img/aloi.jpg",
    src: "/public/mp3/À Lôi.mp3",
  },
  {
    id: 2,
    title: "Chơi Như Tụi Mỹ",
    artist: "AndreeRightHand",
    img: "/public/img/choinhutuimy.jpg",
    src: "/public/mp3/Chơi Như Tụi Mỹ.mp3",
  },
  {
    id: 3,
    title: "id 072019",
    artist: "W/n",
    img: "/public/img/id.jpg",
    src: "/public/mp3/id 072019.mp3",
  },
  {
    id: 4,
    title: "Khóc Ở Trong Club",
    artist: "Hiền Hồ",
    img: "/public/img/khoctrongclub.jpg",
    src: "/public/mp3/Khóc Ở Trong Club.mp3",
  },
  {
    id: 5,
    title: "Miên Man",
    artist: "Minh Huy",
    img: "/public/img/mienman.jpg",
    src: "/public/mp3/Miên Man.mp3",
  },
  {
    id: 6,
    title: "Ngõ Chạm (Kriss Ngo Remix)",
    artist: "BigDaddy, Emily",
    img: "/public/img/ngocham.jpg",
    src: "/public/mp3/Ngõ Chạm (Kriss Ngo Remix).mp3",
  },
  {
    id: 7,
    title: "Nụ Hôn Bisou",
    artist: "Mikelodic",
    img: "/public/img/nuhonbisou.jpg",
    src: "/public/mp3/Nụ Hôn Bisou.mp3",
  },
  {
    id: 8,
    title: "Anh Không Cố Ý",
    artist: "Ogenus, Limitlxss",
    img: "/public/img/rapviet.jpg",
    src: "/public/mp3/Anh Không Cố Ý.mp3",
  },
  {
    id: 9,
    title: "Tình wá akk",
    artist: "TLinh, GreyD",
    img: "/public/img/tinhquaak.jpg",
    src: "/public/mp3/tình wá akk.mp3",
  },
  {
    id: 10,
    title: "Truy Lùng (Cukak Remix)",
    artist: "NamLee",
    img: "/public/img/truylung.jpg",
    src: "/public/mp3/Truy Lùng (Cukak Remix).mp3",
  },
  {
    id: 11,
    title: "Khi Cơn Mơ Dần Phai",
    artist: "Tez",
    img: "/public/img/rapviet.jpg",
    src: "/public/mp3/Khi Cơn Mơ Dần Phai.mp3",
  },
  {
    id: 12,
    title: "Rolling Down",
    artist: "Captain",
    img: "/public/img/rapviet.jpg",
    src: "/public/mp3/Rolling Down.mp3",
  },
];

function App() {
  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleDurationchange = () => {
      setDuration(audio.duration);
    };
    const handleCurrentTimechange = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleNextSong = () => {
      nextSong();
    };
    audio.addEventListener("loadedmetadata", handleDurationchange);
    audio.addEventListener("timeupdate", handleCurrentTimechange);
    audio.addEventListener("ended", handleNextSong);
    return () => {
      audio.removeEventListener("loadedmetadata", handleDurationchange);
      audio.removeEventListener("timeupdate", handleCurrentTimechange);
      audio.removeEventListener("ended", handleNextSong);
    };
  }, []);
  useEffect(() => {
    if (isPlaying && currentSongIndex != -1) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (currentSongIndex != -1) {
      const currentSong = songs[currentSongIndex];
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
    }
  }, [currentSongIndex]);

  const nextSong = () => {
    if (currentSongIndex === songs.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setIsPlaying(false);
  };
  const prevSong = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setIsPlaying(false);
  };
  const selectSong = (id) => {
    const songIndex = songs.findIndex((song) => {
      return song.id === id;
    });
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const handleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
    setVolume(audioRef.current.muted ? 0 : 0.5);
  };

  const handleLoop = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setIsLooping(audioRef.current.loop);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return (
    <Mp3context.Provider
      value={{
        isPlaying,
        togglePlay,
        nextSong,
        prevSong,
        handleLoop,
        handleShuffle,
        duration,
        currentTime,
        audio: audioRef.current,
      }}
    >
      <h1>Playing List</h1>
      <div className="song-container">
        <div className="big-img">
          <h2>Now Playing</h2>
          <img src={songs[currentSongIndex].img} />
        </div>
        <div className="songlist">
          {songs.map((song) => {
            return (
              <div
                className="song"
                key={song.id}
                onClick={() => selectSong(song.id)}
              >
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
            );
          })}
        </div>
        <div className="player">
          <div className="songInfor">
            <img
              src={songs[currentSongIndex].img}
              className={`img ${isPlaying ? "active" : ""}`}
            />
            <div className="name">
              <h4>{songs[currentSongIndex].title}</h4>
              <p>{songs[currentSongIndex].artist}</p>
            </div>
          </div>
          <Player />
          <div className="volume">
            <button onClick={handleMute}>
              {isMuted ? <GoMute /> : <GoUnmute />}
            </button>
            <input
              type="range"
              name="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </Mp3context.Provider>
  );
}

export default App;
