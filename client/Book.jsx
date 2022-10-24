import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as GetBook from './Graph/GetBook.graphql';

export default ({ id }) => {
	const {data} = useQuery(GetBook, {
		variables: {
			id: id
		}
	});

	const book = data ? data.getBook : null;

	return book ? (
		<div>
			<h2>You select: </h2>
			<h3>{book.title}</h3>
			<span>{book.author} </span>
		</div>
	) : (
		<div>Loading...</div>
	);
};
