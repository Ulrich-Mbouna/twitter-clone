import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom"
import {AnimatePresence,motion} from "framer-motion";

export default function CommentModal() {
    const [open, setOpen ] = useRecoilState(modalState);

    return (
        <div className="modal-content">
            <h1>Comment Modal</h1>
            <AnimatePresence>
                <motion.div
                initial={ {opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 1}}
                exit={{ opacity: 1}}
                >
                    {open && <h1>The modal is open</h1>}
                </motion.div>
            </AnimatePresence>
            <button className="border bg-blue-300 p-2 rounded text-white" onClick={() => setOpen(!open)}>Toggle</button>
        </div>
    )
}