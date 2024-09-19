import { useRef } from "react";
import Input from "../components/Input";
import Modal from "../components/Model";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";


const api = "http://localhost:8000/projects";

async function saveProject(data) {
    const res = await fetch(api, {
		method: "POST",
		body: JSON.stringify({ newProject: data }),
		headers: {
            "Content-Type": "application/json",
		},
	});
    
    return res.json();
}

export default function NewProject() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const modal = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    const handleSaveTask = useMutation(
        data => saveProject(data),
        {
            onSuccess: async () => {
                await queryClient.cancelQueries("projects");
                queryClient.invalidateQueries("projects");
                navigate("/");
            }
        }
    )

    const addProject = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDateString = dueDateRef.current.value;

        if(
            title.trim() === "" ||
            description.trim() === "" ||
            dueDateString.trim() === ""
        ) {
            modal.current.open();
            return;
        }

        const data = {
            title, description, dueDate: new Date(dueDateString)
        }

        handleSaveTask.mutate(data)

    }

    return (
        <>
            <Modal ref={modal}>
                <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Oops ... looks like you forgot to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <Link to='/' >
                            <button className="text-stone-800 hover:text-stone-950">
                                    Cancel
                            </button>
                        </Link>
                    </li>
                    <li><button onClick={() => addProject()} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Title" />
                    <Input type="text" ref={descriptionRef} label="Descripiton" textarea />
                    <Input type="date" ref={dueDateRef} label="Due Date" />
                </div>
            </div>
        </>
    )
}