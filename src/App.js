import './App.css';
import AddBook from './components/Addbook';
import Library from './components/Library';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Library/>
        <AddBook/>
      </header>
    </div>
  );
}

export default App;
