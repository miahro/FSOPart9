import { CoursePart } from "../types"
import { Part } from "./Part"

const Content = ( { courseParts }: { courseParts: CoursePart[] }): JSX.Element => {

  return (
    <div>
      { courseParts.map((part) => (
        <div key={part.name}>
          <Part part={part}/>
        </div>
      ))}
    </div>
  )
}

export default Content