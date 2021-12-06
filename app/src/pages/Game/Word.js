import React from "react";

const Word = ({word, y, matchCount}) => {
  return (
    <div>
      <span
        style={{
          position: "absolute",
          left: `${100 - word.position}%`,
          top: `${y}%`,
          fontSize: "2rem",
          transition: "left 95ms",
        }}
        className="board-word"
        key={word.id}
        id={word.id}
        value={word.word}
      >
        <span>
          <span style={{color: "#6EE78E", fontWeight: "bold"}}>
            {word.word.substr(0, matchCount(word.word))}
          </span>
          {word.word.substr(matchCount(word.word))}
        </span>
      </span>
    </div>
  );
};

export default Word;
