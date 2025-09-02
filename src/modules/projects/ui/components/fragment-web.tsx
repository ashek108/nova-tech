import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { Fragment } from "@/generated/prisma/wasm";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";

interface Props {
    data: Fragment;
}

export function FragmentWeb({ data }: Props) {
    const [fragmentKey, setFragmentKey] = useState(0);
    const [copied, setCopied] = useState(false);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Refresh" side="bottom" align="start" >
                    <Button size="sm" variant="outline" onClick={onRefresh}>
                        <RefreshCcwIcon />
                    </Button>
                </Hint>
                <Hint text="Click to copy" side="bottom">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCopy}
                        disabled={!data.sandboxUrl || copied}
                        className="flex-1 justify-start text-start font-normal"
                    >
                        <span className="truncate">
                        {data.sandboxUrl}
                        </span>
                    </Button>
                </Hint>
                <Hint text="Open in a new tab" side="bottom" align="start">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            if (!data.sandboxUrl) return;
                            window.open(data.sandboxUrl, "_blank");
                        }}
                        disabled={!data.sandboxUrl}
                    >
                        <ExternalLinkIcon />
                    </Button>
                </Hint>
            </div>
            <iframe
                key={fragmentKey}
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts allow-forms"
                src={`/api/proxy?url=${encodeURIComponent(data.sandboxUrl)}`}
                loading="lazy"
            />
        </div>
    )
};

//hahahaha went through a lot of bs with this project