import { useAtom } from 'jotai'
import React from 'react'
import { languangeAtom } from '../../../../jotai/atoms'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_FOOTER_EN, LIST_FOOTER_ID } from '../../../../constants/listFooter'
import OptionLanguage from '../OptionLanguage'

const Footer = () => {
    const [language] = useAtom(languangeAtom)
    return (
        <footer className='w-full text-white bg-black border-t-8 border-stone-900 p-8'>
            <div>
                Question? Call <a href='' className='underline'>123-456-789</a>
            </div>
            <ul className='grid grid-cols-4 gap-4 py-8'>
                <EachUtils
                    of={language == "id" ? LIST_FOOTER_ID : LIST_FOOTER_EN}
                    render={(item, index) => (
                        <li key={index}>
                            <a href={item.url} className='underline'>{item.title}</a>
                        </li>
                    )}
                />
            </ul>
            <OptionLanguage />
            <p className='mt-4'>Netflix Indonesia</p>
        </footer>
    )
}

export default Footer