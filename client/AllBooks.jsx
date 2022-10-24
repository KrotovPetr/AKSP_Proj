import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import * as GetAllBooks from './Graph/GetAllBooks.graphql';

export default ({onSelect}) => {
    const {data, loading, refetch} = useQuery(GetAllBooks);
    const [books, setBooks] = useState([])
    useEffect(() => {
        if (!loading) {
            setBooks(data.getAllBooks)
        }
    },[data])
    return (
        <div>
            <h1>Список книг</h1>

            {loading && <div>Loading...</div>}

            {(
                <ul>
                    {books.map(book => (
                        <h2 key={book.id}>
                            {book.id}: {book.title}
                            <br/>
                            Author: {book.author}{' '}
                            <button onClick={() => onSelect(book)}>Выбрать</button>
                        </h2>
                    ))}
                </ul>
            )}
        </div>
    );
};
