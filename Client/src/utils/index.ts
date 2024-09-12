import {surpriseMePrompts} from "../constants"
import FileSaver from 'file-saver';


export const  getRandomPrompt =(prompt:string):string =>{
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt=surpriseMePrompts[randomIndex]

    if(randomPrompt===prompt) return getRandomPrompt(prompt)

    return randomPrompt
}

export const downloadImage = async (id:string,photo:string) => {

    FileSaver.saveAs(photo,`download-${id}.jpg`)
}


