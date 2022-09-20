import Wrapper from "../app/components/Wrapper/Wrapper";
// import getToMainPage from "../app/hoc/getToMainPage";
import UsersListTable from "../app/pages/UsersListTable/UsersListTable";

function Home() {
	return (
		<>
			<Wrapper>
				<UsersListTable />
			</Wrapper>
		</>
	);
}

export default Home;
