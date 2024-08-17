import { Dots } from "../../assets/icons/Dots";
import { User } from "../../interfaces";

export const UserItem = ( { user }: { user: User }) => {

    const propertiesClass: string = "min-w-[150px] xl:w-5/12 flex items-center last:justify-center";
    return (
        <div className="w-full flex border gap-2 rounded-[20px] h-[50px] p-3 shadow-md">
            <div className={ propertiesClass }>{ user.name }</div>
            <div className={ propertiesClass }>{ user.lastname }</div>
            <div className={ propertiesClass }>{ user.username }</div>
            <div className={ propertiesClass }>{ user.email }</div>
            <div className={ propertiesClass }>
                <div className="w-[30px] h-[30px] cursor-pointer rounded-full bg-[#F0F0F0] p-1 rotate-90"><Dots fill="fill-gray-500" /></div>
            </div>

        </div>
    )
}
