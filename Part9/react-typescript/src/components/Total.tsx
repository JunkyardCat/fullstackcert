interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface ContentCollectionProps {
  courseParts: ContentProps[];
}
const Total = (props: ContentCollectionProps): JSX.Element => {
  const contentParts = props.courseParts;
  return (
    <>
      <p>
        Number of exercises
        {contentParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;
