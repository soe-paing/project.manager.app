import { useQuery } from "react-query";
import ProjectSidebar from "./components/ProjectSidebar";
import { Outlet } from "react-router-dom";

const api = "http://localhost:8000/projects";

async function fetchProject() {
    const res = await fetch(api);
    return res.json();
}


function App() {
  const { data, isLoading, isError, error} = useQuery("projects", fetchProject);

  if (isError) {
		return <div>{error}</div>;
	}

  if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <main className="h-screen my-8 flex gap-4 pr-4">
      <ProjectSidebar data={data} />
      <Outlet />
    </main>
  );
}

export default App;
