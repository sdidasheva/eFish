import "../app/styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../app/context/AuthContext";
import { useEffect, useState } from "react";
import { LocalStorageHandler } from "../app/utils/localStorageHandler";
import { AuthService } from "../app/services/AuthService";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

function MyApp({ Component, pageProps }) {
	const [userInfo, setUserInfo] = useState();
	const updateUserInfo = (userInfo: any) => {
		setUserInfo(userInfo);
	};
	const router = useRouter();

	useEffect(() => {
		const userToken = LocalStorageHandler.getUserToken();
		if (userToken) {
			AuthService.getCurrentUser()
				.then((res) => {
					setUserInfo(res.data);
					// console.log(res.data);
				})
				.catch((err) => {
					LocalStorageHandler.clearUserToken();
					router.push("/authorization");
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ userInfo, updateUserInfo }}>
			<Component {...pageProps} />
		</AuthContext.Provider>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			cookies: context.req.cookies ?? "",
		},
	};
};
export default MyApp;
