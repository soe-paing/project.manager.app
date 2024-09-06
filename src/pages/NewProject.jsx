import { useRef } from "react";
import Input from "../components/Input";
import Modal from "../components/Model";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useProjectContext } from "../contexts/ProjectContext";

export default function NewProject() {
    const { setProjectsState } = useProjectContext();
    const navigate = useNavigate();
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const saveProject = () => {
        const enteredTile = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(
            enteredTile.trim() === "" ||
            enteredDescription.trim() === "" ||
            enteredDueDate.trim() === ""
        ) {
            modal.current.open();
            return;
        }

        const projectId = Math.random();
        const newProject = {
            title: enteredTile,
            description: enteredDescription,
            dueDate: enteredDueDate,
            id: projectId,
        }

        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
            }
        })

        navigate('/');
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
                        <button className="text-stone-800 hover:text-stone-950">
                            <Link to='/' >
                                Cancel
                            </Link>
                        </button>
                    </li>
                    <li><button onClick={() => saveProject()} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input type="text" ref={description} label="Descripiton" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />
                </div>
            </div>
        </>
    )
}