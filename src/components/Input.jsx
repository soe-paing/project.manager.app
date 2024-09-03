export default function Input({label, textarea}) {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stion-300 bg-stone-200 text-stone-600 focus:border-stone-600";
    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {textarea ? <textarea className={classes} /> : <input className={classes} />}
        </p>
    )
}