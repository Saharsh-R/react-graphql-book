
import { useState } from "react";
import { useMutation, gql } from '@apollo/client'

const CREATE_BOOK = gql`
mutation CREATE_BOOK($author: String!, $title: String!) {
    addBook(author: $author, title: $title){
      title
      author
    }
  }
`
function AddBook() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const [createBook , {data, error, loading}] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            'ALL_BOOKS'
        ]
    })
    
    let handleSubmit = (e) => {
        e.preventDefault();
        createBook({
            variables: {title, author}
        })
        // dispatch action here.
        setTitle('')
        setAuthor('')
    }
    
    if (error){
        return <p>error</p>
    }
    if (loading){
        return <p>loading</p>
    }
	return (
		<div>
			<h1>Add a book</h1>
			<form  onSubmit = {handleSubmit}>
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
            <div>
                <pre>{data && JSON.stringify(data, null, 2)}</pre>
            </div>
		</div>
	);
}

export default AddBook;
