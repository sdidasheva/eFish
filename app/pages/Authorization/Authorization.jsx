import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AuthService } from "../../services/AuthService";
import { LocalStorageHandler } from "../../utils/localStorageHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../../validation/formSchema";
import Image from "next/image";
import logo from "../../../public/assests/images/Logo.svg";
import Person from "../../icons/Person";
import Lock from "../../icons/Lock";
import Eye from "../../icons/Eye";
import Download from "../../icons/Download";
// import Tabs from "../../components/Tabs/Tabs";

const Authorization = () => {
	const router = useRouter();
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	const [err, setErr] = useState();

	const [toggle, setToggle] = useState(2);

	const toggleTab = (index) => {
		setToggle(index);
	};
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: "onBlur", resolver: yupResolver(formSchema) });

	const onSubmit = (data) => {
		const sendData = {
			email: data.email,
			password: data.password,
		};
		// console.log(sendData);
		AuthService.getAccessToken(sendData)
			.then((res) => {
				// console.log(res);
				LocalStorageHandler.setUserToken(res?.data?.access_token);
				router.push("/admin");
			})
			.catch((res) => {
				setErr(res?.response?.data?.error_message);
				console.log(err);
			})
			.finally();
	};
	// const tabs = [
	// 	{
	// 		name: "Вход по логину",
	// 		content: (
	// 			<>
	// 				<div
	// 					className={`authorization__form-item ${
	// 						errors?.email?.message || errors?.password?.message || err
	// 							? "authorization__form-item-active"
	// 							: ""
	// 					}`}
	// 				>
	// 					<i>
	// 						<Person />
	// 					</i>
	// 					<input
	// 						className="authorization__form-item-input"
	// 						type="text"
	// 						placeholder="Ваш логин"
	// 						{...register("email")}
	// 					/>
	// 				</div>
	// 				<div
	// 					className={`authorization__form-item ${
	// 						errors?.email?.message || errors?.password?.message || err
	// 							? "authorization__form-item-active"
	// 							: ""
	// 					}`}
	// 				>
	// 					<i>
	// 						<Lock />
	// 					</i>
	// 					<input
	// 						className="authorization__form-item-input"
	// 						type={passwordShown ? "text" : "password"}
	// 						placeholder="Ваш пароль"
	// 						{...register("password")}
	// 					/>
	// 					<i
	// 						onClick={togglePassword}
	// 						className={`${
	// 							passwordShown
	// 								? "authorization__form-item-input-show"
	// 								: "authorization__form-item-input-hide"
	// 						} `}
	// 					>
	// 						<Eye />
	// 					</i>
	// 				</div>
	// 				<div
	// 					className={`authorization__form-error ${
	// 						errors?.email?.message || errors?.password?.message || err
	// 							? "authorization__form-error-active"
	// 							: ""
	// 					}`}
	// 				>
	// 					<span>{errors?.email?.message}</span>
	// 					<span>{errors?.password?.message} </span>
	// 					<span>{err}</span>
	// 				</div>
	// 				<button className="authorization__form-button">Войти</button>
	// 			</>
	// 		),
	// 		is_active: true,
	// 	},
	// 	{
	// 		name: "Вход по ЭЦП",
	// 		content: (
	// 			<>
	// 				<div className="authorization__form-file">
	// 					<input type="file" />
	// 					<label>
	// 						<span className="authorization__form-file-icon">
	// 							<Download />
	// 						</span>
	// 						<span className="authorization__form-file-text">
	// 							Загрузите сертификат
	// 						</span>
	// 					</label>
	// 				</div>
	// 				<button className="authorization__form-button">Войти</button>
	// 			</>
	// 		),
	// 		is_active: false,
	// 	},
	// ];

	return (
		<section className="authorization">
			<div className="authorization__container">
				<ul className="authorization__lang">
					<li>Kz</li>
					<li>Ru</li>
				</ul>
				<div className="authorization__company">
					<div className="authorization__company-image">
						<Image src={logo} alt="logo" />
					</div>
					<div className="authorization__company-name">
						<h3 className="authorization__company-name-title">
							МОНИТОРИНГ РЫБ И ДРУГИХ <br />
							ВОДНЫХ ЖИВОТНЫХ
						</h3>
						<p className="authorization__company-name-subtitle">
							Министерство экологогии, геологии и <br />
							природных ресурсов Республики казахстан
						</p>
					</div>
				</div>
				<h3 className="authorization__title">Авторизация</h3>
				<div className="authorization__enter-tabs">
					<p
						className={`authorization__enter-tabs-item ${
							toggle === 1 ? "authorization__enter-tabs-item-active" : ""
						}`}
						onClick={() => toggleTab(1)}
					>
						Вход по ЭЦП
					</p>
					<p
						className={`authorization__enter-tabs-item ${
							toggle === 2 ? "authorization__enter-tabs-item-active" : ""
						}`}
						onClick={() => toggleTab(2)}
					>
						Вход по логину
					</p>
				</div>
				<form
					className={`authorization__form ${
						toggle === 1 ? "authorization__form-active" : ""
					}`}
				>
					<div className="authorization__form-file">
						<input type="file" />
						<label>
							<span className="authorization__form-file-icon">
								<Download />
							</span>
							<span className="authorization__form-file-text">
								Загрузите сертификат
							</span>
						</label>
					</div>

					<button className="authorization__form-button">Войти</button>
				</form>
				<form
					className={`authorization__form ${
						toggle === 2 ? "authorization__form-active" : ""
					}`}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div
						className={`authorization__form-item ${
							errors?.email?.message || errors?.password?.message || err
								? "authorization__form-item-active"
								: ""
						}`}
					>
						<i>
							<Person />
						</i>
						<input
							className="authorization__form-item-input"
							type="text"
							placeholder="Ваш логин"
							{...register("email")}
						/>
					</div>
					<div
						className={`authorization__form-item ${
							errors?.email?.message || errors?.password?.message || err
								? "authorization__form-item-active"
								: ""
						}`}
					>
						<i>
							<Lock />
						</i>
						<input
							className="authorization__form-item-input"
							type={passwordShown ? "text" : "password"}
							placeholder="Ваш пароль"
							{...register("password")}
						/>
						<i
							onClick={togglePassword}
							className={`${
								passwordShown
									? "authorization__form-item-input-show"
									: "authorization__form-item-input-hide"
							} `}
						>
							<Eye />
						</i>
					</div>
					<div
						className={`authorization__form-error ${
							errors?.email?.message || errors?.password?.message || err
								? "authorization__form-error-active"
								: ""
						}`}
					>
						<span>{errors?.email?.message}</span>
						<span>{errors?.password?.message} </span>
						<span>{err}</span>
					</div>
					<button className="authorization__form-button">Войти</button>
				</form>
				{/* <Tabs tabs={tabs} /> */}

				<a className="authorization__pass-forgot">Забыли пароль?</a>
			</div>
		</section>
	);
};

export default Authorization;
