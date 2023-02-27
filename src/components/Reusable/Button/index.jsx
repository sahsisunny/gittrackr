import './button.css';



function Button(props) {
  return (
    <button 
      className={`btn ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;
