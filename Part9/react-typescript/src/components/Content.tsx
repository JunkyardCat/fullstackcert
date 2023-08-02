interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface ContentCollectionProps {
  courseParts: ContentProps[];
}

const Content = (props: ContentCollectionProps): JSX.Element => {
  const contentParts = props.courseParts;
  return (
    <>
      <div>
        {contentParts.map(({ name, exerciseCount }) => (
          <p key={name}>
            {name}
            {exerciseCount}
          </p>
        ))}
      </div>
    </>
  );
};

export default Content;
