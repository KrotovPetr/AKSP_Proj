import React, { useState } from 'react';
import AllBooks from './AllBooks';
import Book from './Book';
import * as AddBook from './Graph/AddBook.graphql';
import {useMutation, useQuery} from "@apollo/react-hooks";
import * as GetAllBooks from "./Graph/GetAllBooks.graphql";
import "./App.css"

export default () => {
	const [selectedBookId, setSelectedBookId] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [newBook] = useMutation(AddBook)
	const {data, loading, error, refetch} = useQuery(GetAllBooks)
	const addNewBook = (e) => {
		e.preventDefault()
		newBook({
			variables: {
				input: {
					title, description,author
				}
			}
		}).then((data) => {
			console.log(data)
			refetch()
		}).catch((e)=>{console.log(e)})
	}
	return (
		<div>
			<div className={"container"}>
				<AllBooks onSelect={book => setSelectedBookId(book.id)} />
			</div>

			{selectedBookId && (
				<div>
					<Book id={selectedBookId} />
				</div>
			)}

			<form>
				<input placeholder={"Title"} onChange={(e)=>{setTitle(e.target.value)}}/>
				<input placeholder={"Description"} onChange={(e)=>{setDescription(e.target.value)}}/>
				<input placeholder={"Author"} onChange={(e)=>{setAuthor(e.target.value)}}/>
				<button onClick={(e)=>{
					addNewBook(e);
				}}>Добавить</button>
			</form>
		</div>
	);
};
