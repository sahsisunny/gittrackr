import './home.css'
import IssueListCard from '../tableDataCard/index'
import TableHeadCard from '../tableHeadCard';

function Home() {
  return (
    <div className='home'>
      <h1>Welcome to my GitHub dashboard!</h1>
      <p>This is a dashboard that displays information about my GitHub profile and repositories.</p>
      <TableHeadCard>

      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
      <IssueListCard />
        <IssueListCard />
        </TableHeadCard>
    </div>
  );
}

export default Home;
