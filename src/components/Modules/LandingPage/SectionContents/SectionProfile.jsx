import { useAtom } from 'jotai'
import React from 'react'
import { languangeAtom } from '../../../../jotai/atoms'
import SectionLayout from '../../../layout/SectionLayout'
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from '../../../../constants/listContent'
import { PROFILE_KIDS_IMAGE } from '../../../../constants/listAsset'
import EachUtils from '../../../../utils/EachUtils'

const SectionProfile = () => {
    const [language] = useAtom(languangeAtom)
    return (
        <SectionLayout>
            <div className='relative max-w-xl mx-auto'>
                <img src={PROFILE_KIDS_IMAGE} alt='' className='relative ' />

            </div>
            <EachUtils
                of={language == "id" ? LIST_CONTENT_4_ID : LIST_CONTENT_4_EN}
                render={(item, index) => (
                    <div key={index} className='px-8'>
                        <h2 className='font-black text-5xl'>{item.title}</h2>
                        <p className='text-2xl mt-4'>{item.desc}</p>
                    </div>
                )}
            />


        </SectionLayout>
    )
}

export default SectionProfile