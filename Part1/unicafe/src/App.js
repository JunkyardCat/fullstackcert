import{ useState } from 'react'
const Statistics = ({good,neutral,bad}) => {

        const all  = good + neutral + bad
        const average = (good - bad)/(good+neutral+bad)
        const positive = (good / (good+neutral+bad)*100)
        if (good===0 && neutral ===0 && bad===0)
        {
                return <p> No feedback given</p>
        }
        else
        {
                /*
        return(
                <>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {good + neutral + bad}</p>
                <p>average {(good - bad)/(good+neutral+bad)}</p>
                <p>positive {(good / (good + neutral + bad))*100}%</p>
                </>
               )
               */
         return(
                 <table>
                 <tbody>
                 <StaticLine text="good" value={good}/>
                 <StaticLine text="neutral" value={neutral}/>
                 <StaticLine text="bad" value={bad}/>
                 <StaticLine text="all" value={all}/>
                 <StaticLine text="average" value={average}/>
                 <StaticLine text="positive" value={positive +"%"}/>
                 </tbody>
                 </table>
         )
         }
}

const StaticLine = (props) => {
        return(
                <tr>
                <td> {props.text}</td><td> {props.value}</td>
                </tr>
               )
}

const Button = (props) => {

        return (
                <button onClick={props.handleClick}>{props.text}</button>
        )

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
            setGood(good + 1)
    }
    const handleNeutral = () => {
            setNeutral(neutral + 1)
    }
    const handleBad = () => {
            setBad(bad + 1)
    }
        //good neutral bad all average positive
    return (
            <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text="good"/><Button handleClick={handleNeutral} text="neutral"/><Button handleClick={handleBad} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
            </div>
         )
}
export default App
