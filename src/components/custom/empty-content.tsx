import {FC} from "react";
import {cn} from "@/lib/utils";
import {Info} from "lucide-react";

type EmptyContentProps = {
    children?: React.ReactNode;
    title: string;
    description?: string;
    render?: () => React.ReactNode | React.ReactNode[];
    classNames?: {
        container?: string;
        wrap_title_desc?: string;
        icon?: string;
        title?: string;
        description?: string;
    };
}

export const EmptyContent: FC<EmptyContentProps> = ({title,render,description,classNames,children}) => {
    const toRender = render?.();
    return(
        <div className={cn("flex items-center flex-col min-h-32 justify-center gap-1", classNames?.container)}>
            {toRender && toRender}
            {!toRender &&
            <>
                <div className={cn("flex flex-col items-center gap-1 justify-center",classNames?.wrap_title_desc)}>
                    <Info size={30} className={cn("text-slate-600", classNames?.icon)} strokeWidth={1.6} />
                    {(title || title != "") && <span className={cn("text-lg font-semibold", classNames?.title)}>{title}</span>}
                </div>
                {(description || description != "") && <span
                    className={cn("text-sm font-medium opacity-55", classNames?.description)}>{description}</span>}
                {children}
            </>
        }
        </div>
    )
}