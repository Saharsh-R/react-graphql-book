
import {  gql } from "@apollo/client";

export const BOOK_DETAILS = gql`
	fragment BookDetails on Book{
		id
		title
		author
		pagesRead
	}
`