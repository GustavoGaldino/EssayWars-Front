import React from "react"

const Word = ({word, y, matchCount}) => {
    return (
        <div>
            <span style={{
                position: "absolute",
                left: `${100 - word.position}%`,
                top:`${y}%`,
                fontSize: "2rem",
                transition: "left 95ms",
            }}
                className="board-word"
                key={word.id}
                id={word.id}
                value={word.word}
            >
                <span>
                    <span style={{color: "#67da86"}}>{word.word.substr(0,matchCount)}</span>
                    {word.word.substr(matchCount)}
                </span>
            </span>
        </div>
    )
}

export default Word