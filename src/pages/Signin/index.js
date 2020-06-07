import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [data, setData] = useState({ email: '', password: '' });

  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!(await schema.isValid(data))) {
      return;
    }

    const { email, password } = data;
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Seu e-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Seua senha"
          onChange={handleChange}
        />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuida</Link>
      </form>
    </>
  );
}

export default Signin;
