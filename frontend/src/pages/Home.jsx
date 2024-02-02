import { useState } from 'react'
import Quiz from '../components/quiz/index.jsx'
import './Home.css'
import ReactLoading from 'react-loading';


function Home() {
    const [userInput, setInput] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePromptSubmit = async () => {
        try {
            setLoading(true);
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_input: userInput })
            };
            const data = await (await fetch(`http://127.0.0.1:5000/api/quiz`, requestOptions)).json()
            console.log(data);
            setLoading(false)
            setData(data)
        } catch (err) {
            console.log(err.message)
        }
    }
    function checkResponse(data) {
        if (data) {
            console.log(data)
            return <Quiz data={data}/>;
        } else {
            return null;
        }

    }
    function loadingIndicator(){
        return (
        <div className="loadingIndicator">
            <h3>Generating Quiz</h3>
            <ReactLoading type={"bars"} color={"#ffffff"} height={25} width={100} />
        </div>
        )
    }
    return (
        <div className='home'>
            <div className='inputContainer'>
                <input required="required" placeholder='What kind of quiz would you like to generate?' value={userInput} onChange={e => setInput(e.target.value)} />
                <button type="submit" onClick={handlePromptSubmit} >Generate Quiz</button>
            </div>
            {loading ? loadingIndicator(): null }
            {checkResponse(data)}
        </div>
    )
}
export default Home