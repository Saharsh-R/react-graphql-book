import gql from "graphql-tag";

import { useQuery, useMutation } from "@apollo/react-hooks";

const ALL_BOOKS = gql`
	query ALL_BOOKS {
		books {
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
						<li key = {new Date()}>
							<h3>{title}</h3>
							<p>Written by - {author}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Library;
