



type ButtonProps = {
  type: "button" | "submit" | "reset";
  handleClick?: () => void;
  styles: string;
  title:string
  disable?: boolean

}




const Button = ({type,handleClick,styles,title,disable}:ButtonProps) => {
  return (
    <button disabled={disable} type={type} onClick={handleClick} className={styles}>
        {title}
    </button>
  );
}

export default Button;
