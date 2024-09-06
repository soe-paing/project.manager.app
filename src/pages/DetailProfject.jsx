import { useNavigate, useParams } from "react-router-dom";
import Tasks from "../components/Task";
import { useProjectContext } from "../contexts/ProjectContext";

export default function DetailProject() {
    const navigate = useNavigate();
    const { projectsState, setProjectsState } = useProjectContext();
    const { id } = useParams();
    const activeProject = projectsState.projects.find(project => project.id == id)
    const formattedDate = new Date(activeProject.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const handleDeleteProject = (id) => {
        setProjectsState( prevState => {
            return {
                ...prevState,
                projects: prevState.projects.filter( project => project.id !== id)
            }
        })
        navigate('/')
    }

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{activeProject.title}</h1>
                    <button onClick={() => handleDeleteProject(activeProject.id)} className="text-stone-600 hover:text-stone-950">Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{activeProject.description}</p>
            </header>
            <Tasks />
        </div>
    )
}