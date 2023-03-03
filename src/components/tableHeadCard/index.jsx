import './tableHeadCard.css'

function TableHeadCard(props) {
     return (
          <div className='section'>
               <h2 className='section-head-text'>
                    {props.title}
               </h2>
               <table className='section-table'>
                    <thead className='section-table-head'>
                         <tr>
                              <th className="table-sn">S/N</th>
                              <th className="table-title">Title</th>
                              <th className="">Status</th>
                         </tr>
                    </thead>
                    <tbody className='list'>
                         {props.children}
                    </tbody>
               </table>
          </div>
     )
};

export default TableHeadCard;
     