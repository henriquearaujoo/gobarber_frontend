import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter 6 caractéres')
    .required('A senha é obrigatória'),
});

function Signup() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: '', email: '', password: '' });

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
    const { name, email, password } = data;
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome completo"
          onChange={handleChange}
        />
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
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </>
  );
}

export default Signup;
