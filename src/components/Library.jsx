
import { useQuery , gql} from "@apollo/client";
import { BOOK_DETAILS } from "./gql";
import Book from "./individualBook";


export const ALL_BOOKS = gql`
	query ALL_BOOKS {
		books {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

function Library() {
	const books = useQuery(ALL_BOOKS);

    if (books.loading) return <p>Loading</p>
    if (books.error) return <p>Error!</p>

	return (
		<div>
			<ul>
				{books.data.books.map( bookData => {
					return <Book key = {bookData.id}  data = {bookData}/>
				})}
				
			</ul>
			{/* <div>
                <pre>{books.data && JSON.stringify(books.data, null, 2)}</pre>
            </div> */}
		</div>
	);
}

export default Library;
