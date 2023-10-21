import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { useToast } from "../hooks/useToast";

const ToastDemo = () => {
    const { isToastVisible, hideToast, data } = useToast();
    const codeClass = data.type === "error" ? "text-[#ff0000]" : "text-[#00ff00]";

    return (
        <Toast.Provider duration={2500} swipeDirection="right">
            <Toast.Root
                className="rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut bg-black text-white"
                open={isToastVisible}
                onOpenChange={() => {
                    hideToast();
                }}
            >
                <div className="flex gap-5 justify-between items-center">
                    <div className="flex flex-col">
                        <Toast.Title className="[grid-area:_title] mb-[5px] font-semibold text-slate12 text-[15px]">
                            {data.title}
                        </Toast.Title>
                        <Toast.Description asChild>
                            <div className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]">
                                {data.info}
                            </div>
                        </Toast.Description>
                    </div>
                    <div className={`text-2xl font-semibold ${codeClass}`}>{data.code}</div>
                </div>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    );
};

export default ToastDemo;
