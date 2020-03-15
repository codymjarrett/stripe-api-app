import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalActiveClasses = 'fixed flex justify-center top-0 left-0 w-full h-full'

export const Modal = ({ handleClose, show, children }) => {
    const node = useRef()

    let container
    if (typeof window !== 'undefined'){
        const rootContainer = document.createElement('div')
        const parentElem = document.querySelector('#__next')
        parentElem.appendChild(rootContainer)
        container = rootContainer
    }
    const showHideClassName = show ? modalActiveClasses : 'hidden'
    const handleClick = e => {
     if(e.composedPath().includes(node.current)){
         return
     }
     handleClose(false)
  }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [])

    return(
        <div  className={showHideClassName} style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <section ref={node} className="fixed bottom-0 bg-white w-full h-auto pb-16">
                {children}
            </section>
        </div>
    )
    return container ? ReactDOM.createPortal(element, container) : null
}

// fixed bottom-0 left-0 px-4 w-full bg-gray-200 z-10 min-h-1/4 
