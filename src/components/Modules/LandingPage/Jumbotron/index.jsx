import React from 'react'
import { JUMBOTRON_IMAGE } from '../../../../constants/listAsset'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_JUMBOTRON_EN, LIST_JUMBOTRON_ID } from '../../../../constants/listJumbotron'
import { useAtom } from 'jotai'
import { languangeAtom } from '../../../../jotai/atoms'
import InputMembership from '../InputMembership'

const Jumbotron = () => {
    const [language] = useAtom(languangeAtom)
    return (
        <div className='mb-32'>
            <img
                src={JUMBOTRON_IMAGE}
                alt='netflix background'
                className='absolute top-0 left-0 object-cover h-[700px] w-full opacity-60'
            />
            <EachUtils
                of={language == 'id' ? LIST_JUMBOTRON_ID : LIST_JUMBOTRON_EN}
                render={(item, index) => (
                    <div key={index} className='relative flex flex-col justify-center items-center mt-44 gap-4 text-center px-4'>
                        <h1 className='text-white font-black text-5xl'>{item.title}</h1>
                        <p className='text-white text-xl'>{item.desc}</p>
                        <InputMembership />
                    </div>
                )}
            />
        </div>
    )
}

export default Jumbotron