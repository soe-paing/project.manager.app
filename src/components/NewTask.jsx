import { useRef } from "react";
// import { useProjectContext } from "../contexts/ProjectContext"

export default function NewTask({ addTask }) {
    const taskRef = useRef();
    // const { projectsState, setProjectsState } = useProjectContext();

    const handleAddTask = () => {
        const newText = taskRef.current.value;
        if (newText.trim() == "") return;
        addTask.mutate(newText);
        taskRef.current.value = '';
    }

    const handleEnter = (e) => e.key === "Enter" && handleAddTask();

    return (
        <div className="flex items-center gap-4">
            <input 
                ref={taskRef} 
                onKeyDown={handleEnter} 
                type="text" 
                className="w-64 flex-1 px-2 py-1 rounded-sm bg-stone-200" />
            <button onClick={() => handleAddTask()} className="text-stone-700 hover:text-stone-950">Add Task</button>
        </div>
    )
}