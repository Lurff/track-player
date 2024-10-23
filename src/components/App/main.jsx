import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./index.css";
import "./i18next.js";

import { ContextProvider } from "./context.jsx";

const Home = lazy(() => import("../../pages/home/Home"));
const Listen = lazy(() => import("../../pages/listen/Listen"));

import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-full h-screen flex flex-col items-center">
				<Suspense fallback={<div>Loading...</div>}>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/listen" element={<Listen />} />
						</Routes>
					</BrowserRouter>
				</Suspense>
				<Footer />
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				className="w-full h-full -z-10 absolute"
			>
				<filter id="n" x="0" y="0">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.5"
						stitchTiles="stitch"
					/>
				</filter>
				<rect width="100%" height="100%" fill="#000" />
				<rect width="100%" height="100%" filter="url(#n)" opacity="0.15" />
			</svg>
		</div>
	</ContextProvider>
);
