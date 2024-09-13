import { downloadImage } from '../utils';
import { Post } from '../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion, useAnimation } from 'framer-motion';
import state from '../store';



const Card = ({ id, name, prompt, photo, blurData }: Post) => {

  const controls = useAnimation(); // Initialize animation controls

  const handleHover = async () => {
    controls.start({
      opacity: 1,

    });
  };

  const handleleav = async () => {
    controls.start({
      opacity: 0,

    });
  };
  



  return (
    <motion.div layout
      onMouseOver={handleHover}
      onMouseLeave={handleleav}
      className="rounded-xl group relative shadow-card cursor-pointer  hover:shadow-cardhover  card"
    >
      <motion.div layoutId={`image-${id}`} transition={{ duration: 0.2 }}>
        <LazyLoadImage
          className="w-full h-auto card_transition  object-fill rounded-xl"
          effect="blur"
          threshold={100}
          placeholderSrc={blurData}
          src={photo}
          alt={prompt}
          onClick={() => { state.selected = { id, name, prompt, photo } }}
        />
      </motion.div>

      <motion.div
        animate={controls}
        initial={{ y: -10, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-col max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
      >
        <p className="text-white line-clamp-3 text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img src={"/download.png"} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
