import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";
import { useProjectContext } from "./contexts/ProjectContext";

function App() {
  const { projectsState, setProjectsState } = useProjectContext();

  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  const handleAddProject = (projectData) => {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    }

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  const handleCancelProject = () => {
    setProjectsState( prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectsState( prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  const handleDeleteProject = (id) => {
    setProjectsState( prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter( project => project.id !== id)
      }
    })
  }
  
  const selectedProject = projectsState.projects.find(project => {
    return project.id === projectsState.selectedProjectId;
  });

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-4">
      <ProjectSidebar
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
