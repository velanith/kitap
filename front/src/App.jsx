import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const { uniteNo, sesId } = useParams();
  const navigate = useNavigate();
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    if (uniteNo && sesId) {
      const audioUrl = `/resources/5turkce/${uniteNo}/${sesId}.mp3`;
      setCurrentAudio({
        id: `${uniteNo}-${sesId}`,
        unit: uniteNo,
        name: `Ses ${sesId}`,
        url: audioUrl,
      });
    }
  }, [uniteNo, sesId]);

  const handleAudioSelect = (unit, ses) => {
    navigate(`/5turkce/${unit}/${ses}`);
  };

  return (
    <div className="app-container">
      <header>
        <h1>5. Sınıf Türkçe Ses Kayıtları</h1>
      </header>

      <main>
        <div className="audio-container">
          {currentAudio ? (
            <audio
              controls
              className="audio-player"
              src={currentAudio.url}
              autoPlay
            >
              Tarayıcınız ses oynatmayı desteklemiyor.
            </audio>
          ) : (
            <div className="no-audio">Lütfen bir ses kaydı seçin</div>
          )}
        </div>

        <div className="audio-list">
          <h2>Ses Kayıtları</h2>
          <div className="unit-container">
            <div className="unit">
              <h3>Ünite 1</h3>
              <button
                onClick={() => handleAudioSelect(1, 1)}
                className={currentAudio?.id === "1-1" ? "active" : ""}
              >
                Ses 1
              </button>
              <button
                onClick={() => handleAudioSelect(1, 2)}
                className={currentAudio?.id === "1-2" ? "active" : ""}
              >
                Ses 2
              </button>
            </div>
            <div className="unit">
              <h3>Ünite 2</h3>
              <button
                onClick={() => handleAudioSelect(2, 1)}
                className={currentAudio?.id === "2-1" ? "active" : ""}
              >
                Ses 1
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
