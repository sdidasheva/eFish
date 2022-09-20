import React from "react";
import Header from "../Header/Header";
import AsideMenu from "../AsideMenu/AsideMenu";

// type MainPage = {
// 	isMain: boolean
// }
const Wrapper = ({ children, isMain = false }) => {
	return (
		<>
			<Header isMain={isMain} />
			<AsideMenu isMain={isMain} />
			<div>{children}</div>
		</>
	);
};

export default Wrapper;
