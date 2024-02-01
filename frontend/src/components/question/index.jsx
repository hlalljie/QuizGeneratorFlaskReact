import { useState } from 'react'
import './index.css'

function Question(props) {
  //const [count, setCount] = useState(0)


  return (
    <>
        <fieldset>
            <legend>{props.qNum + ". " + props.qData.question}</legend>
            <div>
                <input 
                    type="radio"
                    id="choiceA" 
                    name={"q" + props.qNum} 
                    value={"q" + props.qNum + "choiceA"} 
                />
                <label htmlFor={"q" + props.qNum + "choiceA"}>
                        {props.qData.a}
                </label>
            </div>
            <div>
                <input 
                    type="radio"
                    id="choiceB" 
                    name={"q" + props.qNum} 
                    value={"q" + props.qNum + "choiceB"} 
                />
                <label htmlFor={"q" + props.qNum + "choiceB"}>
                        {props.qData.b}
                </label>
            </div>
            <div>
                <input 
                    type="radio"
                    id="choiceC" 
                    name={"q" + props.qNum} 
                    value={"q" + props.qNum + "choiceC"} 
                />
                <label htmlFor={"q" + props.qNum + "choiceC"}>
                        {props.qData.c}
                </label>
            </div>
            <div>
                <input 
                    type="radio"
                    id="choiceD" 
                    name={"q" + props.qNum} 
                    value={"q" + props.qNum + "choiceD"} 
                />
                <label htmlFor={"q" + props.qNum + "choiceD"}>
                        {props.qData.d}
                </label>
            </div>
        </fieldset>
    </>
  )
}

export default Question