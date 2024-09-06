import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({children}, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close(); // Allow external close control
        }
    }));
    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <div className="mt-8 text-right">
                <Button onClick={() => dialog.current.close()}>Okay</Button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    )
})

export default Modal;