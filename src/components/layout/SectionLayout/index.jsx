import React from 'react'

const SectionLayout = ({ children }) => {
    return (
        <section className='relative w-full bg-black text-white'>
            <div className='grid sm:grid-cols-2 max-w-7xl mx-auto justify-center items-center p-8 gap-8 text-center sm:text-left'>
                {children}
            </div>
            <div className='bg-stone-900 w-full h-2 absolute top-0 left-0' />
        </section>
    )
}

export default SectionLayout