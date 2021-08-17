
import { useQuery , gql} from "@apollo/client";

export const ALL_BOOKS = gql`
	query ALL_BOOKS {
		books {
			id
			title
			author
		}
	}
`;

function Library() {
	const books = useQuery(ALL_BOOKS);

    if (books.loading) return <p>Loading</p>
    if (books.error) return <p>Error!</p>

	return (
		<div>
			<ul>
				{books.data.books.map(({ title, author }) => {
					return (
						<li >
							<h3>{title}</h3>
							<p>Written by - {author}</p>
						</li>
					);
				})}
			</ul>
			{/* <div>
                <pre>{books.data && JSON.stringify(books.data, null, 2)}</pre>
            </div> */}
		</div>
	);
}

export default Library;
