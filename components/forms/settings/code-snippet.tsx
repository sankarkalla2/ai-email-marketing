"use client";

import HeadingLabel from "@/components/heading";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);
  let snippet = `
  const iframe = document.createElement("iframe");
  
  const iframeStyles = (styleString) => {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
  }
  
  iframeStyles('
      .chat-frame {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
      }
  ')
  
  iframe.src = "http://localhost:3000/chatbot"
  iframe.classList.add('chat-frame')
  document.body.appendChild(iframe)
  
  window.addEventListener("message", (e) => {
      if(e.origin !== "http://localhost:3000") return null
      let dimensions = JSON.parse(e.data)
      iframe.width = dimensions.width
      iframe.height = dimensions.height
      iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
  })`;

  const [hydrate, setHydrate] = useState(false);
  useEffect(() => {
    setHydrate(true);
  })

  if(!hydrate) return null;
  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <HeadingLabel
        label="Code snippet"
        message="Copy and Paste this code snippet into the header tag of you website"
      />
      <div className="px-10 rounded-lg inline-block relative bg-slate-50">
        {!copying ? (
          <Copy
            className="absolute top-5 right-5 text-gray-400 cursor-pointer"
            onClick={() => {
              setCopying(true);
              navigator.clipboard.writeText(snippet);
              toast({
                title: "Copied to clipboard",
                description: "You can now past the code in inside your website",
              });
              setTimeout(() => {
                //do  nothing
                setCopying(false);
              }, 5000);
            }}
          />
        ) : (
          <Check className="absolute top-5 right-5 text-violet-500" />
        )}
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
