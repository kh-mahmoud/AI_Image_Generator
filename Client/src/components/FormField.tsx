

type FormProps = {
  labelName:string;
  type:string;
  name:string;
  placeholder:string;
  value:string;
  handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  isSurpriseMe?:boolean;
  handleSurpriseMe?:()=>void;
}


const FormField = ({ labelName,type,name,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe,}:FormProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
          <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-900"
            >
              {labelName}
          </label>

          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
            >
              Surprise me
            </button>
          )}
      </div>
            <input
                type={type}
                id={name}
                name={name}
                className="custom_input"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
              />
    </div>
  );
}

export default FormField;
