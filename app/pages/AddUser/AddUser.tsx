import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowBlue from "../../icons/ArrowRole";
import { UsersService } from "../../services/UsersService";
import { useForm, Controller } from "react-hook-form";
import { IAddData } from "../../constants/Interface";
import Select from "react-select";
import Eye from "../../icons/Eye";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSchema } from "../../validation/addSchema";

const AddUser = () => {
	const [selectedOption, setSelectedOption] = useState(null);
	const [roles, setRoles] = useState([]);
	const [passwordShown, setPasswordShown] = useState(false);
	const [repeatPasswordShown, setrepeatPasswordShown] = useState(false);

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IAddData>({
		mode: "onBlur",
		resolver: yupResolver(addSchema),
	});
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	const toggleRepeatPassword = () => {
		setrepeatPasswordShown(!repeatPasswordShown);
	};

	useEffect(() => {
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	const options = roles.map((role) => {
		return { value: role.id, label: role.description };
	});

	const onSubmit = (data: IAddData) => {
		console.log(data);
		const addData = {
			first_name: data.first_name,
			last_name: data.last_name,
			middle_name: data.middle_name,
			email: data.email,
			iin_bin: data.iin_bin,
			password: data.password,
			role_id: data.role_id,
		};
		UsersService.createUser(addData);
		reset({
			first_name: null,
			last_name: null,
			middle_name: null,
			email: null,
			iin_bin: null,
			password: null,
			role_id: null,
		});
	};
	const customStyles = {
		option: (styles: any, { isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isFocused || isSelected ? "#52A5FC" : null,
				color: isFocused || isSelected ? "#FFF" : "#0A091D",
			};
		},
	};

	return (
		<>
			<div className="add__title">
				<Link href={`/admin`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">Добавление пользователя</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="add__info">
				<div className="add__info-row">
					<label className="add__info-row-title">Роль</label>
					<div className="add__info-row-select">
						<>
							<Controller
								control={control}
								name="role_id"
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<>
										<Select
											defaultValue={selectedOption}
											onChange={(item) => {
												onChange(item.value);
											}}
											ref={ref}
											getOptionValue={(option) => {
												return `${option["value"]}`;
											}}
											getOptionLabel={(label) => {
												return `${label["label"]}`;
											}}
											options={options}
											placeholder="Роль"
											classNamePrefix="select"
											styles={customStyles}
											name="role_id"
											value={options.filter((item) =>
												selectedOption
													? selectedOption === item.value
													: value === item.value
											)}
										/>
									</>
								)}
							/>
						</>
					</div>
					<p className="add__info-row-error">{errors?.role_id?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">Имя</label>
					<input
						type="text"
						className="add__info-row-content"
						{...register("first_name")}
						placeholder="Имя"
					/>
					<p className="add__info-row-error">{errors?.first_name?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">Фамилия</label>
					<input
						type="text"
						className="add__info-row-content"
						{...register("last_name")}
						placeholder="Фамилия"
					/>
					<p className="add__info-row-error">{errors?.last_name?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">Отчество</label>
					<input
						type="text"
						className="add__info-row-content"
						{...register("middle_name")}
						placeholder="Отчество"
					/>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">
						Название департамента/
						<br />
						управления/отдела
					</label>
					{/* <input type="text" className="add__info-row-content" /> */}
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">ИИН</label>
					<input
						type="text"
						className="add__info-row-content"
						{...register("iin_bin")}
						placeholder="ИИН"
					/>
					<p className="add__info-row-error">{errors?.iin_bin?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">
						Электронная почта(Логин)
					</label>
					<input
						type="text"
						className="add__info-row-content"
						{...register("email")}
						placeholder="Электронная почта"
					/>
					<p className="add__info-row-error">{errors?.email?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">Пароль</label>
					<div className="add__info-row-content">
						<input
							type={passwordShown ? "text" : "password"}
							className="add__info-row-content-input"
							{...register("password")}
							placeholder="Пароль"
						/>
						<i
							onClick={togglePassword}
							className={`${
								passwordShown
									? "add__info-row-content-show"
									: "add__info-row-content-hide"
							} `}
						>
							<Eye />
						</i>
					</div>
					<p className="add__info-row-error">{errors?.password?.message}</p>
				</div>
				<div className="add__info-row">
					<label className="add__info-row-title">Повтор пароля</label>
					<div className="add__info-row-content">
						<input
							type={repeatPasswordShown ? "text" : "password"}
							className="add__info-row-content-input"
							{...register("repeat_password")}
							placeholder="Повтор пароля"
						/>
						<i
							onClick={toggleRepeatPassword}
							className={`${
								repeatPasswordShown
									? "add__info-row-content-show"
									: "add__info-row-content-hide"
							} `}
						>
							<Eye />
						</i>
					</div>
					<p className="add__info-row-error">
						{errors?.repeat_password?.message}
					</p>
				</div>
				<button type="submit" className="add__info-button">
					Регистрация
				</button>
			</form>
		</>
	);
};

export default AddUser;
