import React, { useState, useEffect } from "react";
import Wrapper from "../../../app/components/Wrapper/Wrapper";
import Layout from "../../../app/components/Layout/Layout";
import EditUser from "../../../app/pages/EdiitUser/EditUser";
import { GetServerSideProps } from "next";
import { UsersService } from "../../../app/services/UsersService";

const Edit = ({ id }: any) => {
	const [userInfo, setUserInfo] = useState();
	useEffect(() => {
		UsersService.getUser(id).then((res) => setUserInfo(res?.data));
	}, []);

	return (
		<Wrapper>
			<Layout>{userInfo && <EditUser userInfo={userInfo} id={id} />}</Layout>
		</Wrapper>
	);
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
