import './tableHeadCard.css'

function TableHeadCard(props) {
     return (
          <>
               <h2>Issues</h2>
               <table className='list'>
                    <thead>
                         <tr>
                              <th className="s-number">S/N</th>
                              <th className="s-title">Title</th>
                              <th className="action-buttons">Action</th>
                         </tr>
                    </thead>
                    <tbody>
                         {props.children}
                    </tbody>
               </table>
          </>
     )
};

export default TableHeadCard;
     