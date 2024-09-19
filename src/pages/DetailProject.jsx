import { useNavigate, useParams } from "react-router-dom";
import Tasks from "../components/Task";
import { useMutation, useQuery, useQueryClient } from "react-query";

const api = "http://localhost:8000/projects";

async function deleteProject(id) {
    return fetch(`${api}/${id}`, { method: "DELETE" });
}

export default function DetailProject() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { data, error, isError, isLoading } = useQuery(["project", id], async _ => {
        const res = await fetch(`${api}/${id}`);
        return res.json();
    });
    const formattedDate = project => new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const handleDeleteProject = useMutation(id => deleteProject(id), {
        onMutate: async id => {
            await queryClient.cancelQueries("projects");
            queryClient.setQueryData("projects", old => {
                return old.filter(item => item.id !== id);
            });
            navigate("/");
        }
    })

    if ( isError ) {
        return <div>{error}</div>;
    } else if ( isLoading ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{data.title}</h1>
                    <button onClick={() => handleDeleteProject.mutate(data.id)} className="text-stone-600 hover:text-stone-950">Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate(data)}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{data.description}</p>
            </header>
            <Tasks tasks={data.tasks} projectId={data.id} />
        </div>
    )
}