import { useSnapshot } from "valtio";
import state from "../store";
import {motion} from "framer-motion"

type Props = { 
    selected:{
        id?: string;
        name?: string;
        prompt?: string;
        photo?: string;

    }
 };


  


const LightBox = () => {

    const snap:Props=useSnapshot(state)

    if(Object.values(snap.selected).length===0 )
    {
        return <></>
    }

  return (
    
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    onClick={()=>state.selected={}} 
    className='h-screen w-screen cursor-pointer fixed bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50'
    >
        <div className="rounded-md overflow-hidden w-[60%] h-[90%]">
           <motion.img  layoutId={`image-${snap.selected.id}`} className="w-[100%] h-[100%] " src={snap.selected.photo} alt={snap.selected.prompt} />
        </div>
    </motion.div>
  );
}

export default LightBox;
