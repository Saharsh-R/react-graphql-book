import "./App.css";
import AddBook from "./components/Addbook";
import DeleteAllBooks from "./components/deleteAllBooks";
import Library from "./components/Library";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div style={{ display: "flex", border: "solid", padding: "20px", margin: "40px" }}>
					<div style={{ width: "500px" }}>
						<AddBook />
						<DeleteAllBooks />
					</div>
					<Library />
				</div>
			</header>
		</div>
	);
}

export default App;
