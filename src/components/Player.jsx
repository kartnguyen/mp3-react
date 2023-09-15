import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { MdShuffle, MdShuffleOn } from "react-icons/md";
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
    isLooping,
    isShuffle,
    setIsPlaying,
  } = useMp3Context();

  const time_convert = (num) => {
    var hours = Math.floor(num / 60);
    var minutes = Math.floor(num % 60)
      .toString()
      .padStart(2, "0");
    return hours + ":" + minutes;
  };
  const handlePlay = () => {
    audio.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="playerHandle">
      <div className="button">
        <button onClick={handleShuffle}>
          {isShuffle ? <MdShuffleOn /> : <MdShuffle />}
        </button>
        <button className="button-main" onClick={prevSong}>
          <BiSkipPrevious />
        </button>
        <button className="button-main" onClick={togglePlay}>
          {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
        <button className="button-main" onClick={nextSong}>
          <BiSkipNext />
        </button>
        <button onClick={handleLoop}>
          {isLooping ? <TbRepeatOnce /> : <TbRepeatOff />}
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
          onMouseDown={handlePause}
          onMouseUp={handlePlay}
        />
        <span className="duration">{time_convert(duration)}</span>
      </div>
    </div>
  );
};

export default Player;
