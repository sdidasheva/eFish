import React, { useState } from "react";

const Tabs = (props: any) => {
	const [tabs, setTabs] = useState(props.items);
	function show(e: any, index: number) {
		tabs.map((tab: any, index_tab: number) => {
			tab["is_active"] = false;
			if (index === index_tab) {
				tab["is_active"] = true;
			}
			return tabs;
		});
		setTabs([...tabs]);
	}

	return (
		<>
			<ul className="authorization__enter-tabs">
				{tabs &&
					tabs?.map((tab: any, index: number) => {
						return (
							<li
								key={index}
								onClick={(e) => show(e, index)}
								className={`authorization__enter-tabs-item ${
									tab["is_active"]
										? "authorization__enter-tabs-item-active"
										: ""
								}`}
							>
								{tab["name"]}
							</li>
						);
					})}
			</ul>
			<div>
				{tabs &&
					tabs?.map((tab: any, index: number) => {
						return (
							<form
								key={index}
								className={`authorization__form ${
									tab["is_active"] ? "authorization__form-active" : ""
								}`}
							>
								{tab["content"]}
							</form>
						);
					})}
			</div>
		</>
	);
};

export default Tabs;
