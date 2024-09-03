import Button from "./Button";

export default function ProjectSidebar() {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2>Sidebar</h2>
            <div>
                <Button>
                    + Add New Project
                </Button>
            </div>
            <ul></ul>
        </aside>
    )
}