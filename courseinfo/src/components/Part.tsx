import { CoursePart } from "../types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ part }: { part: CoursePart }) => {
  //console.log(part)
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b> {part.name} {part.exerciseCount} </b>
          <br></br>
          <em> {part.description} </em>
        </div>
      );
    case "group":
      return (
        <div>
          <b> {part.name} {part.exerciseCount} </b>
          <br></br>
          project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <b> {part.name} {part.exerciseCount} </b>
          <br></br>
          <em> {part.description} </em>
          <br></br>
          background material 
          <a href = {part.backgroundMaterial}> {part.backgroundMaterial}</a>
        </div>

      );
    case "special":
      return (
        <div>
          <b> {part.name} {part.exerciseCount} </b>
          <br></br>
          <em> {part.description} </em>
          <br></br>
          Required skills:  &nbsp;
          {part.requirements.map( (item) =>  item).join(', ')}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part