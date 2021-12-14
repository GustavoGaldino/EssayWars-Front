import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

import socketIOClient from "socket.io-client";

import history from "../../history";

import successSound from '../../sounds/success.mp4'

import oofSound from '../../sounds/oof.mp3'

import {Context} from "../../Context/UserProvider";

import kirby from "../../images/kirby.png";

import InvitePlayer from "../InvitePlayer/InvitePlayer";
import PlayerInfo from "./PlayerInfo";
import Word from "./Word";

require("dotenv").config();

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || "http://localhost:3000";

const Game = () => {
  const {match, clientId, player} = useContext(Context);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameMatch, setGameMatch] = useState({});

  const hpRef = useRef();

  const [gamePlayer, setGamePlayer] = useState({});

  const socketRef = useRef();

  const typedRef = useRef("");

  function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handlePress = useCallback((e) => {
    const key = e.key;

    const isSmallCaseLetter = (k) => {
      return k >= "a" && k <= "z";
    };

    const isUpperCaseLetter = (k) => {
      return k >= "A" && k <= "Z";
    };

    if (!isSmallCaseLetter(key) && !isUpperCaseLetter(key)) return;

    const words = document.getElementsByClassName("board-word");

    const attackWords = document.getElementsByClassName("attack-word")

    var match = false;

    typedRef.current += key.toLowerCase();

    for (let index = 0; index < words.length; index++) {
      const w = words[index].getAttribute("value");
      if (w.length < typedRef.current.length) continue;
      else if (w.length === typedRef.current.length) {
        if (w.toLowerCase() === typedRef.current.toLowerCase()) {
          socketRef.current.emit("word_finished", words[index].id);
          const audio = new Audio(successSound)
          audio.play()
          typedRef.current = "";
          break;
        }
      } else if (
        w.substr(0, typedRef.current.length).toLowerCase() ===
        typedRef.current.toLowerCase()
      ) {
        match = true;
      }
    }

    for (let index = 0; index < attackWords.length; index++) {
      const w = attackWords[index].getAttribute("value");
      if (w.length < typedRef.current.length) continue;
      else if (w.length === typedRef.current.length) {
        if (w.toLowerCase() === typedRef.current.toLowerCase()) {
          socketRef.current.emit("attack_word_finished", attackWords[index].id);
          const audio = new Audio(successSound)
          audio.play()
          typedRef.current = "";
          break;
        }
      } else if (
        w.substr(0, typedRef.current.length).toLowerCase() ===
        typedRef.current.toLowerCase()
      ) {
        match = true;
      }
    }

    if (!match) {
      typedRef.current = "";
    }
  }, []);

  useEffect(() => {
    if (!clientId) history.push("/");

    window.addEventListener("keypress", handlePress);

    const socket = socketIOClient(`${SOCKET_ENDPOINT}/match/${match.id}`, {
      auth: {
        playerId: player.id,
      },
    });

    socket.on("start_match", (match) => {
      setGameMatch(match);
      setGamePlayer(match.players[player.id]);
      setGameStarted(true);
    });

    socket.on("update_player", async (newPlayerState) => {

		  if(hpRef.current !== undefined){
        if(hpRef.current !== newPlayerState.hp){
          console.log("entrou")
          const audio = new Audio(oofSound);
          audio.play();
        } 
      }

      if(newPlayerState.hp === 0){
        for(let i = 0 ; i < 20 ; i++){
          const audio = new Audio(oofSound);
          audio.play();
          await sleep(50);
        }
      }

      hpRef.current = newPlayerState.hp;
      setGamePlayer(newPlayerState);
    });

    socket.on("other_player_update", (newPlayer) => {
      setGameMatch((previous) => {
        return {
          ...previous,
          players: {
            ...previous.players,
            [newPlayer.id]: {...previous.players[newPlayer.id], ...newPlayer},
          },
        };
      });
    });

    socket.on("message", async (msg) => {
      const alert = document.getElementById("alert");
      alert.innerHTML = msg.text;
      alert.style.display = "initial";
      await sleep(2500)
      alert.style.display = "none";
    });

    socketRef.current = socket;

    return () => {
      socket.off("message");
      socket.off("update_player");
      socket.off("other_player_update");
      socket.off("start_match");
      window.removeEventListener("keypress", handlePress);
      socket.disconnect();
    };
  }, [clientId, handlePress, player.id, match.id]);

  const getMatchCount = useCallback((word) => {
    if (word.length < typedRef.current) return 0;
    const w = word.toLowerCase();
    return w.substr(0, typedRef.current.length).toLowerCase() ===
      typedRef.current.toLowerCase()
      ? typedRef.current.length
      : 0;
  }, []);

  return (
    <div className="full-screen-container">
      <>
        {gameStarted ? (
          <div className="game-window">
            <div className="header-game-window">
              <PlayerInfo
                username={gamePlayer.user.nickname}
                hp={gamePlayer.hp}
              />
              {Object.values(gameMatch.players).map((currentPlayer) => {
                return player.created_at === currentPlayer.created_at ? (
                  <div key="div"></div>
                ) : (
                  <PlayerInfo
                    username={currentPlayer.user.nickname}
                    hp={currentPlayer.hp}
                    key={currentPlayer.created_at}
                    float="right"
                  />
                );
              })}
            </div>
            <div className="main-game-window">
              <div className="main-game-window-left">
                <img
                  src={kirby}
                  alt="kirby-fofo"
                  style={{width: "100%", height: "100%"}}
                />
              </div>
              <div
                className="main-game-window-right"
                style={{position: "relative"}}
              >
                {gamePlayer.board.words.map((word) => {
                  return (
                    <Word
                      word={word}
                      y={gamePlayer.board.yMap[word.id]}
                      matchCount={getMatchCount}
                    />
                  );
                })}
              </div>
            </div>
            <div className="footer-game-window" style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}>
              {gamePlayer.board.attackWords.map((word) => {
                return(
                  <div style={{width: "33%", textAlign: "center"}} key={word.id} >
                    <span
                      style={{
                        fontSize: "2rem",
                        color: "#f5574c",
                      }}
                      className="attack-word"
                      id={word.id}
                      value={word.word}
                    >
                      <span style={{color: "white"}}>
                        {word.word.substr(0, getMatchCount(word.word))}
                      </span>
                      {word.word.substr(getMatchCount(word.word))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <InvitePlayer socketRef={socketRef} />
        )}
        <div style={{position: "absolute", display: "flex", justifyContent: "start", height: "100vh"}}>
          <h1 id="alert" style={{
            color: "white",
          }}></h1>
        </div>
      </>
    </div>
  );
};

export default Game;
