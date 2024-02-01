import { useState } from 'react'
import Question from '../question/index.jsx'
import './index.css'


function Quiz(props) {
  //const [count, setCount] = useState(0)
  const qComps = []
  for (let i = 0; i < props.data.question_list.length; i++){
    qComps.push(<Question qNum={i+1} qData={props.data.question_list[i]}/>)
  }
  return (
    <div className='quiz'>
      <h2>{props.data.title}</h2>
      <form>
        {qComps}
      </form>
    </div>
  )
}

export default Quiz