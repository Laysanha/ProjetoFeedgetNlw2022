import { CloseButton } from "../CloseButton";

import bugImage from "../../assests/bug.svg";
import ideaImage from "../../assests/idea.svg";
import thoughtImage from "../../assests/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeesbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeebackSucessStep";


export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImage,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImage,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImage,
            alt: 'Imagem de um balão de pensamento'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null)
    const [ feedbackSend, setFeedbackSend] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSend(false);
        setFeedbackType(null);
    };

    return (
        <div className=" bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            
            {feedbackSend ? (
                <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedBackSent={() => setFeedbackSend(true)}
                        />
                    )}
                </>
            ) 
            
            }

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://www.rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}