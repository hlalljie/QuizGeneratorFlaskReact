import { useState } from "react";
import "./index.css";

function Question(props) {
  //const [count, setCount] = useState(0)

  let choices = 4;
  let option_letters = ["a", "b", "c", "d"];
  let options = [];
  for (let i = 0; i < choices; i++) {
    options.push(
      <div>
        <input
          type="radio"
          id={"choice" + option_letters[i].toUpperCase()}
          name={"q" + props.qNum}
          value={option_letters[i]}
        />
        <label htmlFor={"q" + props.qNum + "choice" + option_letters[i].toUpperCase()}>
          {option_letters[i].toUpperCase() + ". " + props.qData[option_letters[i]]}
        </label>
      </div>
    );
  }

  return (
    <div className="question">
      <fieldset>
        <legend>{props.qNum + ". " + props.qData.question}</legend>
        <hr />
        {options}
      </fieldset>

      {props.showAnswers ? (
        <>
          <hr />
          <p className="Answer">Answer {props.qData.answer}</p>
        </>
      ) : null}
    </div>
  );
}

export default Question;
