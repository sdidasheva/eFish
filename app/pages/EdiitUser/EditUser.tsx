import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowBlue from "../../icons/ArrowRole";
import { UsersService } from "../../services/UsersService";
import { useForm, Controller } from "react-hook-form";
import { IEditData } from "../../constants/Interface";
import Select from "react-select";
import Eye from "../../icons/Eye";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../../validation/editSchema";
import { useRouter } from "next/router";

const EditUser = ({ userInfo, id }) => {
	const [selectedOption, setSelectedOption] = useState(userInfo.role_id);
	const [roles, setRoles] = useState([]);
	const [passwordShown, setPasswordShown] = useState(false);
	const [repeatPasswordShown, setrepeatPasswordShown] = useState(false);
	const router = useRouter();
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	const toggleRepeatPassword = () => {
		setrepeatPasswordShown(!repeatPasswordShown);
	};

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<IEditData>({
		mode: "onBlur",
		resolver: yupResolver(editSchema),
	});
	const onSubmit = (data: IEditData) => {
		console.log(data);
		const editData = {
			first_name: data.first_name,
			last_name: data.last_name,
			middle_name: data.middle_name,
			email: data.email,
			iin_bin: data.iin_bin,
			password: data.password,
			role_id: data.role_id,
		};
		UsersService.editUser(id, editData);
		router.push("/admin");
	};

	useEffect(() => {
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	const options = roles.map((role) => {
		return { value: role.id, label: role.description };
	});

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
				<h3 className="title">Редактирование пользователя</h3>
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
											defaultValue={options.filter((item) =>
												selectedOption
													? selectedOption === item.value
													: value === item.value
											)}
											onChange={(item) => {
												setSelectedOption(onChange(item.value));
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
						defaultValue={userInfo.first_name}
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
						defaultValue={userInfo.last_name}
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
						defaultValue={userInfo.middle_name}
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
						defaultValue={userInfo.iin_bin}
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
						defaultValue={userInfo.email}
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
					Сохранить
				</button>
				<Link href={"/admin"}>
					<button className="add__info-button-back">Назад</button>
				</Link>
			</form>
		</>
	);
};

export default EditUser;
