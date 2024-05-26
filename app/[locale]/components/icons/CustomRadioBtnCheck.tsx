import { RiRadioButtonLine } from 'react-icons/ri'

export default function CustomRadioBtnCheck() {
  return (
    <div className='invisible peer-checked:visible absolute ltr:left-6 rtl:right-6 m-auto top-6 w-f text-2xl mt-1'>
      <RiRadioButtonLine className='peer-checked:bg-gray-700' />
    </div>
  )
}
