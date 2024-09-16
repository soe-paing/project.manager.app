import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const ProjectContext = createContext();

export function useProjectContext () {
    return useContext(ProjectContext);
}
const api = "http://localhost:8000/projects";

async function fetchProjects() {
    const res = await fetch(api);
    return res.json();
}

export default function ProjectContextProvider ({children}) {
    const { data, isLoading, isError, error} = useQuery("projects", fetchProjects);

    return (
        <ProjectContext.Provider value={data} >
            {
                isError ? <div>{error}</div> :
                isLoading ? <div>Loading...</div> :
                children
            }
        </ProjectContext.Provider>
    )
}