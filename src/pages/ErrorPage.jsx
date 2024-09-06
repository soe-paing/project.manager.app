import { Link } from "react-router-dom"

export default function ErrorPage() {
    return <>
        <div className="flex h-[400px] justify-center items-center">
            Something Went Wrong    
            <Link to="/">Go Home</Link>
        </div>
    </>
}