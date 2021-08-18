import { useMutation, gql } from "@apollo/client";
import { BOOK_DETAILS } from "./gql";

const UPDATE_PAGE = gql`
    mutation ADD_PROGRESS($id: String!, $progress: Int!) {
        updateProgress(id: $id, progress: $progress) {
        ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
// const UPDATE_PAGE  = gql``
function Book({ data }) {
	let { id, title, author, pagesRead } = data;
    let input;


    const [updateBookFunction, {newBook, loading, error}] = useMutation(UPDATE_PAGE)

    let handleSubmit = (e) => {
		e.preventDefault();
        let increase = parseInt(input.value)
        console.log(increase)
		updateBookFunction({ // here it works without even caching and also removing the following fields
			variables: { id, progress: increase },
            optimisticResponse : {
                __typename: 'Mutation',
                updateProgress : {
                    id: id,
                    // title : 'zzzzzzzzzzzzzzzzzzz', //ideally should be {title}
                    // author : 'ppppppppppppppppp', //ideally should be {author}
                    __typename : 'Book',
                    pagesRead : 99999999999999,
                }
            }
		});
		// dispatch action here.
        input.value = ''
		
	};
    

	return (
		<li key={id}>
			<h3 style={{ marginBottom: "0" }}>{title}</h3>
			<span style={{ color: "greenyellow" }}>Written by - {author}</span> <br />
			<span>
				Pages Read - <strong>{pagesRead}</strong>
			</span>
			<br />
            
			<form onSubmit={handleSubmit}>
				<span style = {{fontSize : '14px'}}>{loading ? 'Updating ' : 'Add Progress'}</span>
				<input min = '1' type="number" required ref = {node => {input = node; }}/>

				<button disabled = {loading} type="submit">Update</button>
			</form>
		</li>
	);
}
export default Book;
