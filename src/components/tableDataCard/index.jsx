import "./tableDataCard.css";
import Button from "./../Reusable/Button";
function issueListCard(props) {
     return (
          <tr className="table-list-card"
               onClick={props.onClick}
          >
               <td className="serial-number">
                    {props.sn}
               </td>
               <td className="data-title" >
                    {props.title}
               </td>
                    
                    <td className="action-buttons">
                   {props.status === "open" ? (
    <Button
        text="Open"
        onClick={props.onClick}
        className="btn--red"
    />
) : props.merged === true ? (
    <Button
        text="Merged"
        onClick={props.onClick}
        className="btn--blue"
    />
) : (
    <Button
        text="Closed"
        onClick={props.onClick}
        className="btn--green"
    />
)}

                    </td>
               </tr>
     )
};

export default issueListCard;