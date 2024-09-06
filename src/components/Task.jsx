import { useProjectContext } from "../contexts/ProjectContext";
import NewTask from "./NewTask";

export default function Tasks() {
    const { projectsState, setProjectsState } = useProjectContext();

    const handleClear = (id) => {
        setProjectsState( prevState => {
            const updatedTasks = prevState.tasks.filter(task => task.id !== id );
            return ({
                ...prevState,
                tasks: updatedTasks,
            })
        })
    }

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask />
            {projectsState.tasks.length === 0 ? (
                <p className="text-stone-800 my-4 text-center">
                    This project does not have any tasks yet.
                </p>
            ) : (
                <ul className="p-4 m-8 rounded-md bg-stone-100">
                    {
                        projectsState.tasks.map( task => (
                            <li key={task.id} className="flex justify-between my-4">
                                <span>{task.text}</span>
                                <button onClick={() => handleClear(task.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
            }
        </section>
    )
}