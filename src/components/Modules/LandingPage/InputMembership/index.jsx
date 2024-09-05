import React from 'react'
import EachUtils from '../../../../utils/EachUtils'
import { useAtom } from 'jotai'
import { emailAtom, languangeAtom } from '../../../../jotai/atoms'
import { LIST_CTA_EN, LIST_CTA_ID } from '../../../../constants/listCTA'
import DefaultButton from '../../DefaultButton'
import { useNavigate } from 'react-router-dom'

const InputMembership = () => {
    const [language] = useAtom(languangeAtom)
    const [, setEmail] = useAtom(emailAtom)
    const navigate = useNavigate()

    const emailHandle = (e) => {
        e.preventDefault()

        navigate("/register")
    }
    return (
        <form>
            <EachUtils
                of={language == 'id' ? LIST_CTA_ID : LIST_CTA_EN}
                render={(item, index) => (
                    <div key={index} >
                        <h3>{item.title}</h3>
                        <div className='relative flex justify-center items-center gap-2 py-4'>
                            <input
                                placeholder={item.labelInput}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent'
                            />
                            <label
                                // className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-8 peer-focus:top-[16px] transition-all -z-10 text-white'
                                className='absolute top-[18px] left-0 pl-4 peer-placeholder-shown:translate-y-[14px] peer-focus:translate-y-[0px] transition-all text-white peer-placeholder-shown:text-white peer-focus:text-white -z-10'
                            >{item.labelInput}</label>
                            <DefaultButton
                                onClick={emailHandle}
                                text={item.buttonSubmit}
                                isArrowIcon={true}
                                styles={"flex py-4 w-1/2 justify-center items-center gap-3"} />
                        </div>
                    </div>
                )}
            />
        </form>
    )
}

export default InputMembership