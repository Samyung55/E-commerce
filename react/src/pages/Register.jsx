import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import './Register.css'

import { useAuthContext } from '../context/contexts/authContext'
import * as actionTypes from '../context/utils/auth'

const RegisterScreen = () => {
    const { register, handleSubmit, formState: { errors }} = useForm()

    const { dispatch } = useAuthContext()

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const { data } = axios.post('/api/auth/register', formData)

        dispatch({ type: actionTypes.AUTH, payload: data.data })

        navigate('/')
    }

    return (
        <div className="registerscreen" onSubmit={handleSubmit(onSubmit)}>
            <form action="" className="registerscreen__form">

            </form>
        </div>
    )
}