import { useRouter } from "next/router"

const style = {
  wrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#003049] transition-all hover:duration-200 hover:ease-in-out bg-white`, // White background with dark blue hover effect
  iconContainer: `text-xl mr-4 text-black hover:text-white`, // Black color for icons and white text on hover
  textGeneral: `font-medium text-black hover:text-white`, // Black text for general state and white text on hover
  textActive: `font-bold text-black`, // Active state remains black text
};




function SidebarOption({  text,Icon,isActive,setSelected,redirect  }){
 const router = useRouter()
  return(
    <div
    className={style.wrapper}
    onClick={() => {
       setSelected(text)
       router.push(redirect)
    }}
  >
    <div className={style.iconContainer}>
    <Icon />
  </div>
  <div className={`${isActive ? style.textActive : style.textGeneral}`}>
    {text}
  </div>
</div>
  )
}

export default SidebarOption