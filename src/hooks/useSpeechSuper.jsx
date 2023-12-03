import jsSHA from 'jssha';
import config from "../config";

function useSpeechSuper() {
  const perfectScore = 70;

  const sendAudioToSpeechSuperAPI = async (audioURL, word, isSingleWord) => {
    
    var baseUrl = "https://api.speechsuper.com/";

    const appKey = config.speechSuperAppKey;
    const secretKey = config.speechSuperSecretKey;

    var coreType = isSingleWord ? "word.eval" : "para.eval";
    var refText = word; 
    var audioType = "mp3";
    var sampleRate = 16000;
    var userId = "guest";

    var url = baseUrl + coreType;

    function getConnectSig() {
      var timestamp = new Date().getTime().toString();
      var shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.update(appKey + timestamp + secretKey);
      var sig = shaObj.getHash('HEX');
      return { sig: sig, timestamp: timestamp };
    }
    
    function getStartSig() {
      var timestamp = new Date().getTime().toString();
      var shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.update(appKey + timestamp + userId + secretKey);
      var sig = shaObj.getHash('HEX');
      return { sig: sig, timestamp: timestamp, userId: userId };
    }

    var createUUID = (function (uuidRegEx, uuidReplacer) {
      return function () {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
      };
    })(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === "x" ? r : (r & 3 | 8);
      return v.toString(16);
    });
    var connectSig = getConnectSig();
    var startSig = getStartSig();
    var params = {
      connect: {
        cmd: "connect",
        param: {
          sdk: {
            version: 16777472,
            source: 9,
            protocol: 2
          },
          app: {
            applicationId: appKey,
            sig: connectSig.sig,
            timestamp: connectSig.timestamp
          }
        }
      },
      start: {
        cmd: "start",
        param: {
          app: {
            applicationId: appKey,
            sig: startSig.sig,
            userId: startSig.userId,
            timestamp: startSig.timestamp
          },
          audio: {
            audioType: audioType,
            sampleRate: sampleRate,
            channel: 1,
            sampleBytes: 2
          },
          request: {
            coreType: coreType,
            refText: refText,
            tokenId: createUUID(),
            paragraph_need_word_score: 1,
          }
        }
      }
    };

    let response = await fetch(audioURL);
    const audio = await response.blob();
    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("text", JSON.stringify(params));
    response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: { "Request-Index": "0" },
    });

    return response.json().then((res) => {
      console.log(res)
      if(isSingleWord) {
        return {
          phonics: res.result.words[0].scores.stress,
        };
      }
      else {
        return {
          sentences: res.result.sentences
        }
      }
      
    })

  };

  const generateResult = (speechSuperResult) => {
    if(!speechSuperResult) return;
    const letters = [];
    const dot = <span className="pronounce__dot">.</span>;

    speechSuperResult.laymans.forEach((layman, index) => {
      letters.push(
        <span
          key={index}
          style={{ color: chooseColorsForScores(layman.score) }}
        >
          {layman.phrase}
          {index < speechSuperResult.laymans.length - 1 ? dot : null}
        </span>
      );
    })

    return letters;
  };

  const generateFeedback = (speechSuperResult) => {
    if(!speechSuperResult) return;
    const feedbacks = [];

    const feedbackContainer = (phrase, suggestion, index) => {
      return(
        <div className="pronounce__feedback box-shadow" key={index}>
          <div className="feedback__item">
            <h3>{phrase}</h3>
            <p>{suggestion}</p>
          </div>
        </div>
      );
    };
    speechSuperResult.feedbacks.forEach((item, index) => {
      feedbacks.push(feedbackContainer(item.phrase, item.suggestion, index));
    })

    return feedbacks;
  };

  const chooseColorsForScores = (score) => {
    if (score >= perfectScore) {
      return "#00d100"; // Green
    } else if (score >= perfectScore - 20) {
      return "#FFAA00"; // Yellow-Orange
    } else {
      return "#FF0000"; // Red
    }
  };

  const checkIsPerfectScore = (speechSuperResult) => {
    if (!speechSuperResult) return false;
    return speechSuperResult.laymans.every(layman => layman.score >= perfectScore);
  };

  return {
    sendAudioToSpeechSuperAPI,
    generateResult,
    generateFeedback,
    chooseColorsForScores,
    checkIsPerfectScore
  };

}

export default useSpeechSuper;