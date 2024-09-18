import { useMutation, useQueryClient } from "react-query";
import NewTask from "./NewTask";
import { useParams } from "react-router-dom";

const api = "http://localhost:8000/tasks";

const deleteTask = id => {
    return fetch(`${api}/${id}`, { method: "DELETE" });
}

async function postTask(text, projectId) {
    const res = await fetch(api, {
		method: "POST",
		body: JSON.stringify({ text, projectId }),
		headers: {
            "Content-Type": "application/json",
		},
	});
    
    return res.json();
}

export default function Tasks({tasks}) {
    const queryClient = useQueryClient();

    const projectId = useParams();

    const handleClear = useMutation(
        (id) => deleteTask(id),
        {
            onMutate: async id => {
                await queryClient.cancelQueries("project");
                queryClient.setQueriesData("project", old => {
                    console.log(old);
                    return ({
                        ...old,
                        tasks: old.tasks.filter( task => task.id !== id )
                    })
                })
            }
        }
    )

    const handleAddTask = useMutation(
        text => postTask(text, Number(projectId)),
        {
            onSuccess: async () => {
                await queryClient.cancelQueries("project");
                queryClient.invalidateQueries("project");
            }
        }
    )

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask addTask={handleAddTask} />
            {tasks.length === 0 ? (
                <p className="text-stone-800 my-4 text-center">
                    This project does not have any tasks yet.
                </p>
            ) : (
                <ul className="p-4 m-8 rounded-md bg-stone-100">
                    {tasks.map( task => (
                        <li key={task.id} className="flex justify-between my-4">
                            <span>{task.text}</span>
                            <button onClick={() => handleClear.mutate(task.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                        </li>
                    ))}
                </ul>
            )
            }
        </section>
    )
}