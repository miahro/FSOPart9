import { CoursePart } from "../types"

const Content = ( { courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      { courseParts.map(( {name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content