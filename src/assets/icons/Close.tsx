
export const CloseIcon = ({ stroke }: { stroke?: string }) => {
    return (
        <div className="w-[25px] h-[25px]">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="19 19 26 26" enableBackground="new 0 0 64 64">
                <g>
                    
                    <line className={`stroke-white ${ stroke }`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="19.75" y1="44.25" x2="44.25" y2="19.75"/>
                </g>
                <g>
                    
                    <line className={`stroke-white ${ stroke }`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="44.25" y1="44.25" x2="19.75" y2="19.75"/>
                </g>
            </svg>
        </div>
    )
}
