
import { useState } from "react";

function AddBook() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    
	return (
		<div>
			<h1>Add a book</h1>
			<form>
				<div>
					<label>Title: </label>
					<input value = {title} onChange = {(e) => setTitle(e.target.value)}  type="text" />
				</div>
                <div>
					<label>Author: </label>
					<input value = {author} onChange = {(e) => setAuthor(e.target.value)}  type="text" />
				</div>


				<button  type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddBook;
