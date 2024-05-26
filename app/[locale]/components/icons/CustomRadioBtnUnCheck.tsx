import { RiCheckboxBlankCircleLine } from 'react-icons/ri'

export default function CustomRadioBtnUnCheck() {
  return (
    <div className='visible peer-checked:invisible absolute ltr:left-6 rtl:right-6 m-auto top-6 text-2xl mt-1'>
      <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
    </div>
  )
}
