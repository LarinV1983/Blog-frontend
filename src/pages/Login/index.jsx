import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {fetchUser, selectIsAuth} from '../../redux/slices/auth';

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';

import styles from "./Login.module.scss";

export const Login = () => {
  const isRegister = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: {errors, isValid}
} = useForm({
    defaultValues: {
      email: 'larinv1@mail.ru',
      password: '11111122',
    },
    mode: 'OnChange',
  });

const onSubmit = async (values) => {
 const data = await dispatch(fetchUser(values));

 if (!data.payload) {
  return alert ('НЕ УДАЛОСЬ АВТОРИЗОВАТЬСЯ!');
 }

 if ('token' in data.payload) {
  window.localStorage.setItem('token', data.payload.token);
 }
};

if (isRegister) {
  return <Navigate to="/" />;
};


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit = {handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error= {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Укажите почту'})}
        fullWidth
      />
      <TextField className={styles.field} 
      label= "Пароль"
      error= {Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password', {required: 'Укажите пароль'})}
      fullWidth 
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
