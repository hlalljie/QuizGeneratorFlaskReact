import { useState } from 'react'
import Question from '../question/index.jsx'
import './index.css'


function Quiz(props) {
  const [showAnswers, setShowAnswers] = useState(false)
  const [values, setValues] = useState(new Array(props.data.question_list.length).fill(null));

  function handleQuizSubmission(){
    return () => setShowAnswers(true)
  }

  function score(){
    let score = 0
    for (let i = 0; i < values.length; i++){
      if (values[i] === props.data.question_list[i].answer){
        score++;
      }
    }
    let percent = (score / props.data.question_list.length * 100).toFixed(2)
    return (
      <h3>Score: {percent}% ({score} / {props.data.question_list.length})</h3>
    )
  }

  const qComps = []
  for (let i = 0; i < props.data.question_list.length; i++){
    qComps.push(<Question qNum={i+1} qData={props.data.question_list[i]} showAnswers={showAnswers} values={values} setValues={setValues}/>)
  }

  

  return (
    <div className='quiz'>
      
      <h2>{props.data.title}</h2>
      {showAnswers ? score() : null}
      <form>
        {qComps}
      </form>
      <button className="quizSubmit" type="submit" onClick={handleQuizSubmission()} >Submit Answers</button>
    </div>
  )
}

export default Quiz