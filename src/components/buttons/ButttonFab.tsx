import { AddIcon } from '../../assets/icons/Add'

export const ButttonFab = ( { onClick }: { onClick: () => void } ) => {
  return (
    <div className="md:hidden fixed w-[50px] h-[50px] bg-orange-600 rounded-full bottom-2 right-2 shadow-lg" onClick={ onClick }>
        <button className="w-full h-full flex justify-center items-center"><AddIcon /></button>
    </div>
  )
}
