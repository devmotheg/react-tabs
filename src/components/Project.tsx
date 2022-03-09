/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React, { useEffect, useState } from "react";

const DATA_URL = "https://course-api.com/react-tabs-project";

interface SVGProps {
	className?: string;
}

interface ButtonProps {
	text: string;
	isActive: boolean;
	clickHandler: () => void;
}

interface PageProps {
	company: string;
	dates: string;
	duties: string[];
	id: string;
	order: number;
	title: string;
}

const DoubleArrowSVG = (props: SVGProps) => {
	return (
		<svg {...props} viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
			<path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
		</svg>
	);
};

const TabButton = ({ text, isActive, clickHandler }: ButtonProps) => {
	return (
		<button
			className={`md:px-16 md:py-2 p-2 text-xl uppercase transition hover:text-cyan-600 hover:shadow-[0_0.15rem_rgb(8,145,178)] md:hover:shadow-[-0.15rem_0_rgb(8,145,178)] ${isActive &&
				"text-cyan-600 shadow-[0_0.15rem_rgb(8,145,178)] md:shadow-[-0.15rem_0_rgb(8,145,178)]"
				}`}
			onClick={clickHandler}>
			{text}
		</button>
	);
};

const TabPage = (props: PageProps) => {
	const { company, dates, duties, title } = props;

	return (
		<>
			<h2 className="mb-3 text-2xl capitalize">{title}</h2>
			<span className="block px-4 py-[0.1rem] uppercase mb-4 font-bold tracking-wider rounded text-slate-500 bg-slate-200 w-fit">
				{company}
			</span>
			<span className="block mb-6 tracking-wider text-slate-500">{dates}</span>
			<ul className="space-y-4">
				{duties.map((d, i) => (
					<li key={i} className="flex items-center gap-8 text-slate-700">
						<DoubleArrowSVG className="w-4 h-4 shrink-0 fill-cyan-600" />
						{d}
					</li>
				))}
			</ul>
		</>
	);
};

const Project = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [tabs, setTabs] = useState<PageProps[]>([]);
	const [active, setActive] = useState<PageProps | null>(null);

	useEffect(() => {
		fetch(DATA_URL)
			.then(res => res.json())
			.then(data => {
				setTabs(data);
				setActive(data[0]);
				setIsLoading(false);
			});
	}, []);

	if (isLoading)
		return <h1 className="text-4xl font-bold capitalize">loading...</h1>;

	return (
		<>
			<h1 className="relative py-4 mb-12 text-4xl font-bold capitalize after:w-2/4 after:h-1 after:absolute after:bottom-0 after:left-2/4 after:-translate-x-1/2 after:bg-cyan-600">
				our experience
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 max-w-[70rem]">
				<div className="flex justify-center gap-2 md:justify-start md:flex-col">
					{tabs.map((t, i) => (
						<TabButton
							key={i}
							text={t.company}
							isActive={active === t}
							clickHandler={() => setActive(t)}
						/>
					))}
				</div>
				<div>
					<TabPage {...active!} />
				</div>
			</div>
		</>
	);
};

export default Project;
