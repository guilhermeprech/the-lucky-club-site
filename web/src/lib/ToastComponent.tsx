import { useEffect, useState } from "react"

export default function ToastComponent({showToast, title, text} : {showToast: Boolean, title: String, text: String}) {

    const [toast, setToast] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setToast(true)
        }, 5000)
        setToast(false)
    }, [showToast])

    return (
        <>
        {
            toast
             && (
                <div className="fixed bottom-6 right-6 z-50 border border-black/10 bg-[var(--background)] px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                        {title}
                    </p>
                    <p className="mt-2 text-[14px] text-black/80">
                        {text}
                    </p>
                </div>
            )
        }
        </>
    )
}