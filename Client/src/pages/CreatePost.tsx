import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import Button from '../components/Button';
import axios from 'axios';



const CreatePost = () => {
  const navigate = useNavigate();
  const [generatingImg, setgenratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(false)

  //form state
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });


  //handling form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({ ...form, [e.target.name]: e.target.value })

  }

//generating random prompt

  const handleSurpriseMe = () => {

    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })

  }

//generating image using octo ai model
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setgenratingImg(true);
        setdisable(true)
        const { data } = await axios.post("https://dall-e-image-generator-8csh.onrender.com/api/v1/octo", { prompt: form.prompt })
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.url}` })
        setgenratingImg(false);
        setdisable(false)
      } catch (error) {

        alert(error);
        setgenratingImg(false);
        setdisable(false)
      }
    }
    else {
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
     e.preventDefault();

    if (form.photo && form.prompt) {
      setLoading(true);
      setdisable(true)
      try {
        const  data  = await axios.post("https://dall-e-image-generator-8csh.onrender.com/api/v1/post", form)
        if (data.status === 200) {
          navigate('/');
        }
       

      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
        setdisable(false)
      }
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="img-preview">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}

          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            type="button"
            handleClick={generateImage}
            styles="generate-image-button"
            title={generatingImg ? 'Generating...' : 'Generate'}
            disable={disable}
          />
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>

          <Button
            type="submit"
            styles="share-image-button"
            title={loading ? 'Sharing...' : 'Share with the Community'}
            disable={disable}
          />
        </div>

      </form>
    </section>
  );
}

export default CreatePost;
