import { useState } from "react";
import "./index.css";

function Question(props) {
  //const [count, setCount] = useState(0)

  function changeValue(choice){
    const newValues = props.values.map((value, index) => {
        if (index === props.qNum -1) {
            return choice
        }
        return value
    })
    props.setValues(newValues);
  }

  let choices = 4;
  let option_letters = ["a", "b", "c", "d"];
  console.log(props.values)
  let options = [];
  for (let i = 0; i < choices; i++) {
    options.push(
      <div>
        <input
          type="radio"
          id={"choice" + option_letters[i].toUpperCase()}
          name={"q" + props.qNum}
          value={option_letters[i]}
          checked={option_letters[i] === props.values[props.qNum - 1]}
          onChange={() => changeValue(option_letters[i])}
        />
        <label htmlFor={"q" + props.qNum + "choice" + option_letters[i].toUpperCase()}>
          {option_letters[i].toUpperCase() + ". " + props.qData[option_letters[i]]}
        </label>
      </div>
    );
  }

  function answer(){
    if (props.showAnswers)
    {
        let message = "Correct!"
        if (props.qData.answer != props.values[props.qNum-1]){
            message = "Incorrect, the correct answer is: " + props.qData.answer.toUpperCase()
        }
        return (
                <>
                <hr />
                <p className="Result">{message}</p>
                </>
        );
    }
    return null;
  }

  return (
    <div className="question">
      <fieldset>
        <legend>{props.qNum + ". " + props.qData.question}</legend>
        <hr />
        {options}
      </fieldset>
      {answer()}
    </div>
  );
}

export default Question;
