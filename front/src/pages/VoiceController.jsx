import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const VoiceController = () => {
  const { uniteNo, sesId } = useParams();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (uniteNo && sesId) {
      // Public klasöründen ses dosyasına erişim
      const audioUrl = `/public/resources/${uniteNo}/${sesId}.m4a`;
      setCurrentAudio({
        id: `${uniteNo}-${sesId}`,
        unit: uniteNo,
        name: `Ses ${sesId}`,
        url: audioUrl,
      });
    }
  }, [uniteNo, sesId]);

  // Audio yüklendiğinde başlangıç ayarlarını yap
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [currentAudio]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Ses oynatma hatası:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
      if (progressRef.current) {
        progressRef.current.style.setProperty("--progress", `${progress}%`);
      }
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = (x / width) * 100;
      const time = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
    }
  };

  return (
    <div className="voice-controller">
      <h2>
        Ünite {uniteNo} - Ses {sesId}
      </h2>

      <div className="audio-player-container">
        <audio
          ref={audioRef}
          src={currentAudio?.url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.playbackRate = playbackRate;
              audioRef.current.volume = volume;
            }
          }}
        />

        <div className="controls">
          <button onClick={handlePlayPause} className="play-pause-btn">
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <div className="progress-container">
            <div
              ref={progressRef}
              className="progress-bar"
              onClick={handleProgressClick}
            />
          </div>

          <div className="volume-control">
            <label>Ses:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          <div className="speed-control">
            <label>Hız:</label>
            <select value={playbackRate} onChange={handlePlaybackRateChange}>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceController;
