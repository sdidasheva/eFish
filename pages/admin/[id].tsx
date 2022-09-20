import React, { useState, useEffect } from "react";
import Wrapper from "../../app/components/Wrapper/Wrapper";
import Layout from "../../app/components/Layout/Layout";
import { UsersService } from "../../app/services/UsersService";
import ShowUser from "../../app/pages/ShowUser/ShowUser";
import { GetServerSideProps } from "next";

const Show = ({ id }) => {
	const [userInfo, setUserInfo] = useState();
	useEffect(() => {
		UsersService.getUser(id).then((res) => setUserInfo(res?.data));
	}, []);
	// console.log(userInfo);
	return (
		<Wrapper>
			<Layout>{userInfo && <ShowUser userInfo={userInfo} />}</Layout>
		</Wrapper>
	);
};

export default Show;
export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
