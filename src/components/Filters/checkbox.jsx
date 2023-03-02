import './filter.css';

const Checkbox = ({ label, isChecked, onChange }) => {
     return (
          <label className="container">
               <input type="checkbox" checked={isChecked} onChange={onChange} />
               <div className="checkmark"></div>
               {label}
          </label>
     );
};

export default Checkbox;
