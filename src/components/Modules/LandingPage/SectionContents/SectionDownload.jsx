import React from 'react'
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from '../../../../constants/listContent'
import { DOWNLOAD_COVER_IMAGE, DOWNLOAD_PHONE_IMAGE } from '../../../../constants/listAsset'
import { useAtom } from 'jotai'
import { languangeAtom } from '../../../../jotai/atoms'
import SectionLayout from '../../../layout/SectionLayout'
import EachUtils from '../../../../utils/EachUtils'

const SectionDownload = () => {
    const [language] = useAtom(languangeAtom)
    return (
        <SectionLayout>
            <div className='relative max-w-xl mx-auto'>
                <img src={DOWNLOAD_PHONE_IMAGE} alt='' className='relative ' />
                <div className='absolute flex items-center bottom-0 left-1/2 -translate-x-1/2 bg-black border border-white rounded-xl py-2 px-4 w-[60%] gap-4' >
                    <img src={DOWNLOAD_COVER_IMAGE} className='max-h-20' />
                    <div className='text-left'>
                        <p>Stranger Things</p>
                        <p className='text-blue-600'>Download...</p>
                    </div>
                </div>
            </div>
            <EachUtils
                of={language == "id" ? LIST_CONTENT_2_ID : LIST_CONTENT_2_EN}
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

export default SectionDownload