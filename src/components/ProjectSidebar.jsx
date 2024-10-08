import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { useProjectContext } from "../contexts/ProjectContext";

export default function ProjectSidebar() {
    const data = useProjectContext();
    const navigate = useNavigate();
    const activeid = useParams().id ?? undefined;
    const handleSelect = (id) => {
        navigate(`/detailproject/${id}`);
    };
    
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
                {data.map(project => {
                    let classes = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
                    if (project.id == activeid) {
                        classes += " bg-stone-800 text-stone-200";
                    } else {
                        classes += " text-stone-400"
                    }
                    return <li key={project.id}>
                        <button onClick={() => handleSelect(project.id)} className={classes}>
                            {project.title}
                        </button>
                    </li>
                })}
            </ul>
        </aside>
    )
}