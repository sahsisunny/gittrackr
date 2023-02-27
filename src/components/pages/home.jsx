import './home.css'
import IssueListCard from '../tableDataCard/index'
import TableHeadCard from '../tableHeadCard';

const array = (length) => Array.from({ length });

function Home() {
  return (
    <div className='home'>
      <div className="left">
        <TableHeadCard
          title="Issues"
        >          
        {
            array(100).fill().map((_, i) => <IssueListCard key={i}
              sn={i+1}
              title="Idle user next task preference response time is too long and should be"
              status="open"
              onClick={() => console.log('clicked')}
            />)
        }
        </TableHeadCard>
    </div> 
      <div className="right">
        <TableHeadCard
          title="Pulll Requests"
        >
        {
            array(100).fill().map((_, i) => <IssueListCard key={i}
              sn={i+1}
              title="Idle user next task preference response time is too long and should be"
              status="closed"
              onClick={() => console.log('clicked')}
            />)
        }
        </TableHeadCard>
      </div>
      <div className="sidebar">

      </div>
      
      </div>
  );
}

export default Home;
