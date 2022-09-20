import React, { useState, useEffect } from "react";
import logo from "../../../public/assests/images/Logo.svg";
import Image from "next/image";
import Bell from "../../icons/Bell";
import Arrow from "../../icons/Arrow";
import Setting from "../../icons/Setting";
import Exit from "../../icons/LogOut";
import { useAuthContext } from "../../context/AuthContext";
import { LocalStorageHandler } from "../../utils/localStorageHandler";
import { useRouter } from "next/router";
import Profile from "../../icons/Profile";
import Link from "next/link";

const Header = ({ isMain = false }) => {
	const [show, setShow] = useState(false);
	const { userInfo, updateUserInfo } = useAuthContext();
	const router = useRouter();
	useEffect(() => {
		// console.log('user');
		// console.log(userInfo)
	}, [userInfo]);

	const LogOut = () => {
		LocalStorageHandler.clearUserToken();
		router.push("/authorization");
	};
	return (
		<header className="header">
			<div className="header__container row">
				<Link href="/">
					<div className="header__company col-lg-5 col-1">
						<div className="header__company-image">
							<Image
								src={logo}
								alt="logo"
								width="56"
								height="56"
								layout="fixed"
							/>
						</div>
						<div className="header__company-name">
							<h3 className="header__company-name-title">
								МОНИТОРИНГ РЫБ И ДРУГИХ <br />
								ВОДНЫХ ЖИВОТНЫХ
							</h3>
							<p className="header__company-name-subtitle">
								Министерство экологогии, геологии и <br />
								природных ресурсов Республики казахстан
							</p>
						</div>
					</div>
				</Link>
				<div className="header__right col-lg-7 col-11">
					<ul className="header__lang">
						<li>Kz</li>
						<li>Ru</li>
					</ul>
					<div
						className={`header__reminder ${
							isMain ? "header__reminder-mainpage" : ""
						}`}
					>
						<div className="header__reminder-icon">
							<Bell />
						</div>
						<p className="header__reminder-cyrcle">2</p>
					</div>
					{isMain ? (
						<Link href="/authorization">
							<button className="header__mainpage-button">Войти</button>
						</Link>
					) : (
						<div className="header__dropdown">
							<button
								className={`header__dropdown-button ${
									show ? "header__dropdown-button-active" : ""
								}`}
								onClick={() => setShow(!show)}
							>
								<p>
									{userInfo?.first_name} {userInfo?.last_name}
									<br /> <span>{userInfo?.role.description}</span>
								</p>
								<Arrow />
							</button>
							<button
								className={`header__dropdown-button-mobile ${
									show ? "header__dropdown-button-mobile-active" : ""
								}`}
								onClick={() => setShow(!show)}
							>
								<Profile />
							</button>
							{show && (
								<div className="header__dropdown-items">
									<a href="#">
										<Setting /> Настройки
									</a>
									<a href="#" onClick={LogOut}>
										<Exit /> Выход
									</a>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
