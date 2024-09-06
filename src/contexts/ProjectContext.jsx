import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function useProjectContext () {
    return useContext(ProjectContext);
}

export default function ProjectContextProvider ({children}) {
    const [ projectsState, setProjectsState ] = useState({
        selectedId: null,
        projects: [],
        tasks: [],
    });

    return (
        <ProjectContext.Provider value={{
            projectsState,
            setProjectsState,
        }} >
            {children}
        </ProjectContext.Provider>
    )
}