const Part = (props) => {
     return(
         <>
             <p>{props.part} {props.exercise}</p>
         </>
     )
}

const Header = (props) => {
     return(
       <>
         <h1>{props.course}</h1>
       </>
     )
}

const Content =(props) => {
     return(
       <>
             <Part part={props.part1} exercise={props.exercise1} />
             <Part part={props.part2} exercise={props.exercise2} />
             <Part part={props.part3} exercise={props.exercise3} />
       </>
     )
}

const Total = (props) => {
     return(
       <>
             <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
       </>
     )
}



const App = () => {
    const course = 'Half Stack application development'
    /*const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']*/
    /*const exercises = [10 , 7, 14]*/
    const part1 = 'Fundamentals of React'
    const part2 = 'Using props to pass data'
    const part3 = 'State of a component'
    const exercise1 = 10
    const exercise2 = 7
    const exercise3 = 14

    return(
        <div>
            console.log('start')
            <Header course={course} />
            {/* <Content parts = {parts} exercises = {exercises}/> */}
            <Content part1={part1} part2={part2} part3={part3} exercise1={exercise1} exercise2={exercise2}  exercise3={exercise3} />

            {/* <Total exercises = {exercises}/> */}
            <Total exercise1={exercise1} exercise2={exercise2}  exercise3={exercise3} />
        </div>
    )
}

export default App
