import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = props => {
    const initialUpdateData = {
        id: '',
        title: '',
        director: '',
        metascore: null,
        stars: []
    };

    const [updateData, setUpdateData] = useState(UpdataData);
    const {id} = useParams();
    const history = useHistory();

    const onChange = e => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/movies/${id}', updateData)
        .then(({data}) =>{
            console.log(data);
            setUpdateData(initialUpdateData)
            history.push('/');
        }).catch(err=>{
            console.log(err);
        });
    }

    useEffect(()=> {
        axios.get('http://localhost:5000/api/movies/${id}')
        .then(({data})=>{
            setUpdateData({
                ...data
            })
        }).catch(err=>{
            console.log(err);
        });
    }, []);

    return (
        <div className="update-movie">
            <form onSubmit={onSubmit}>
            <h1>Update Movie</h1>
                <label>
                    Title: <input onChange={onChange} type="text" name="title" value={updateData.title}/>
                </label>
                <label>
                    Director: <input onChange={onChange} type="text" name="director" value={updateData.director}/>
                </label>
                <label>
                    Metascore: <input onChange={onChange} type="text" name="metascore" value={updateData.metascore}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateForm;