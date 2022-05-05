import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreensShotButtom } from "../ScreensShotButtom";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedBackSent: () => void;
}

export function FeedbackContentStep({
        feedbackType,
        onFeedbackRestartRequested,
        onFeedBackSent
}: FeedbackContentStepProps){

    const [screenshot, setScreensShot] = useState<string | null>(null);
    const [comment, setComment] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        console.log(
            screenshot,
            comment,
        )
        onFeedBackSent();
    }

    return(
        <>
            <header>
                <button
                    type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft width="bold" 
                    className="w-4 h-4"
                    onClick={onFeedbackRestartRequested} />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton/>
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-offset-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-thin" 
                    placeholder="Conte com detalhes o que etapa acontecendo..."
                    onChange={event => setComment(event.target.value)}
                    >
                </textarea>

                <footer className="flex gap-2 mt-2">

                    <ScreensShotButtom
                        screenshot={screenshot}
                        onScreenShotTook={setScreensShot}
                    />

                    <button 
                        type="submit" 
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        Enviar feedback
                    </button>
                </footer>

            </form>
        </>
    )
}