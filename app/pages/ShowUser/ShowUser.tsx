import React from "react";
import ArrowBlue from "../../icons/ArrowRole";
import Link from "next/link";

const ShowUser = ({ userInfo }) => {
	console.log(userInfo);
	return (
		<>
			<div className="show__title">
				<Link href={`/admin`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>

				<h3 className="title">Просмотреть пользователя</h3>
			</div>
			<div className="show__info">
				<div className="show__info-row">
					<label className="show__info-row-title">Роль</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.role.description}
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">Имя</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.first_name}
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">Фамилия</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.last_name}
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">Отчество</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.middle_name}
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">
						Название департамента/
						<br />
						управления/отдела
					</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value=""
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">ИИН</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.iin_bin}
					/>
				</div>
				<div className="show__info-row">
					<label className="show__info-row-title">
						Электронная почта(Логин)
					</label>
					<input
						type="text"
						className="show__info-row-content"
						disabled={true}
						value={userInfo.email}
					/>
				</div>
			</div>
		</>
	);
};

export default ShowUser;
