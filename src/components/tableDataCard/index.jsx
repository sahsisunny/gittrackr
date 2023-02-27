import "./tableDataCard.css";
import Button from "./../Reusable/Button";
function issueListCard(props) {
     return (
               <tr className="table-list-card">
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
                         />
                    ) : (
                         <Button
                              text="Closed"
                              onClick={props.onClick}
                         />
                    )}
                    </td>
               </tr>
     )
};

export default issueListCard;