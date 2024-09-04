import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({children}, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {open() {
            dialog.current.showModal();
        }}
    })
    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form action="dialog" className="mt-8 text-right">
                <Button>Okay</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
})

export default Modal;