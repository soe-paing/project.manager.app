import ProjectSidebar from "./components/ProjectSidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="h-screen my-8 flex gap-4 pr-4">
      <ProjectSidebar />
      <Outlet />
    </main>
  );
}

export default App;
