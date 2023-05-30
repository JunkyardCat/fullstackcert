const Part = (props) =>{
        console.log("inside part comp",props)
        return(
            <p>{props.name} {props.points}</p>
        )
    
}
const Content = (props) =>{
        console.log("inside Content comp",props)
        
        return(
                <>
                {
                props.parts.map(parts=>
                        <Part key={parts.id} name={parts.name} points={parts.exercises} />
                )
                }
                </>
        )
        
        /*
       return (
               <>
           <Part name={props.parts[0].name} points={props.parts[0].exercises} />
           <Part name={props.parts[1].name} points={props.parts[1].exercises} />
           <Part name={props.parts[2].name} points={props.parts[2].exercises} />
               </>
       )
       */

}
const Course = (props) =>{
         
        console.log("inside course comp",props)
        return(
                <>
                <Header name={props.course.name}/>
                 <Content parts={props.course.parts} />
                <Total parts={props.course.parts}/>
                </>

        )

}

const Header = (props) => {
        console.log("inside header component",props)
     return(
       <>
         <h1>{props.name}</h1>
       </>
     )
}


const Total = (props) => {
     const total = props.parts.reduce((s, p) =>{
             console.log("inside reduce",s,p)
             return s+p.exercises   
        },0
        )
        console.log("inside total comp",total,props.parts)

     return(
       <>
             <p>Number of exercises {total}</p>
       </>
     )
}
export default Course
