import { Link, useParams } from "react-router-dom";
import Button from "./Button";
import { useProjectContext } from "../contexts/ProjectContext";

export default function ProjectSidebar() {
    const { projectsState } = useProjectContext();
    const { id } = useParams();
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2>Sidebar</h2>
            <div>
                <Link to='/createproject'>
                    <Button>
                        + Add New Project
                    </Button>
                </Link>
            </div>
            <ul className="mt-8">
                {projectsState.projects.map(project => {
                    let classes = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
                    if (project.id === id) {
                        classes += " bg-stone-800 text-stone-200";
                    } else {
                        classes += " text-stone-400"
                    }
                    return <li key={project.id}>
                        <Link to={`/detailproject/${project.id}`} >
                            <button className={classes}>
                                {project.title}
                            </button>
                        </Link>
                    </li>
                })}
            </ul>
        </aside>
    )
}