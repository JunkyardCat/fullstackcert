import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  //const contentParts = props.courseParts;
  //courseParts.map((c, i) => console.log(c, i));
  return (
    <>
      <div>
        {courseParts.map((coursePart, i) => (
          <Part key={i} coursePart={coursePart} />
        ))}
      </div>
    </>
  );
};

export default Content;
