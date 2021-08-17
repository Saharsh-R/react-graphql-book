import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_BOOKS } from "./Library";

const CREATE_BOOK = gql`
	mutation CREATE_BOOK($author: String!, $title: String!) {
		addBook(author: $author, title: $title) {
            id
			title
			author
		}
	}
`;

function AddBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	// const [createBook , {data, error, loading}] = useMutation(CREATE_BOOK, {
	//     refetchQueries: [
	//         'ALL_BOOKS'
	//     ]
	// })

	const [createBook, { data, error, loading }] = useMutation(CREATE_BOOK, {
		update(cache, { data: { addBook } }) {
			const { books } = cache.readQuery({ query: ALL_BOOKS });
			cache.writeQuery({
				query: ALL_BOOKS,
				data: { books: [addBook, ...books] },
			});
		},
		// onQueryUpdated(z) {
		// 	// Define any custom logic for determining whether to refetch
		// 	if (true) {
		// 		return z.refetch();
		// 	}
		// },
	});

	let handleSubmit = (e) => {
		e.preventDefault();
		createBook({
			variables: { title, author },
            optimisticResponse : {
                __typename: 'Mutation',
                addBook : {
                    id: 234,
                    title : 'OOOOOZOCOOFSOWFOOOWOOOOOOFOOSFOOFS',
                    author : 'VSSSCOOOOODEEEEEEEE',
                    __typename : 'Book'
                }
                
            }
		});
		// dispatch action here.
		setTitle("");
		setAuthor("");
	};

	if (error) {
		return <p>error</p>;
	}
	if (loading) {
		return <p>loading</p>;
	}
	return (
		<div>
			<h1>Add a book</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title: </label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
				</div>
				<div>
					<label>Author: </label>
					<input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" />
				</div>

				<button type="submit">Submit</button>
			</form>
			<div>
                <h2>Latest added book</h2>
				<pre>{data && JSON.stringify(data, null, 2)}</pre>
			</div>
		</div>
	);
}

export default AddBook;
