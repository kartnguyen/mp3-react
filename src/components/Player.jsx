import React from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious, BiShuffle } from "react-icons/bi";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { useMp3Context } from "../hooks/useMp3Context";

const Player = () => {
  const {
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    handleLoop,
    handleShuffle,
    duration,
    currentTime,
    audio,
  } = useMp3Context();

  const time_convert = (num) => {
    var hours = Math.floor(num / 60);
    var minutes = (num % 60).toFixed(0);
    return hours + ":" + minutes;
  };
  console.log(handleShuffle);
  return (
    <div className="playerHandle">
      <div className="button">
        <button onClick={handleShuffle}>
          {handleShuffle ? (
            <div className="off">
              <BiShuffle />
            </div>
          ) : (
            <div className="on">
              {" "}
              <BiShuffle />
            </div>
          )}
        </button>
        <button onClick={prevSong}>
          <BiSkipPrevious />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
        <button onClick={nextSong}>
          <BiSkipNext />
        </button>
        <button onClick={handleLoop}>
          <TbRepeat />
        </button>
      </div>
      <div className="duration-container">
        <span className="current-time">{time_convert(currentTime)}</span>
        <input
          type="range"
          name="duration"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => {
            audio.currentTime = e.target.value;
          }}
          onMouseDown={() => audio.pause()}
          onMouseUp={() => audio.play()}
        />
        <span className="duration">{time_convert(duration)}</span>
      </div>
    </div>
  );
};

export default Player;
