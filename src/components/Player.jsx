import React from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious, BiShuffle } from "react-icons/bi";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";

const Player = ({
  isPlaying,
  onToggle,
  onPrev,
  onNext,
  onLoop,
  onShuffle,
  duration,
  currentTime,
  audio,
}) => {
  const time_convert = (num) => {
    var hours = Math.floor(num / 60);
    var minutes = (num % 60).toFixed(0);
    return hours + ":" + minutes;
  };

  return (
    <div className="playerHandle">
      <div className="button">
        <button>
          {onShuffle ? (
            <BiShuffle />
          ) : (
            <div className="on">
              {" "}
              <BiShuffle />
            </div>
          )}
        </button>
        <button onClick={onPrev}>
          <BiSkipPrevious />
        </button>
        <button onClick={onToggle}>
          {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
        <button onClick={onNext}>
          <BiSkipNext />
        </button>
        <button onClick={onLoop}>
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
