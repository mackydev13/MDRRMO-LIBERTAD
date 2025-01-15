import useAutoLogin from 'hooks/use-auto-login'
import useYupValidationResolver from 'hooks/use-yup-validation-resolver'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { useState } from 'react'

import NotificationComponent from 'components/ui-elements/Notification'

import InputField from 'components/ui-elements/input-field'

import { loginSchema } from 'configs/yup-validation-schemas'

import { asyncLogin , Notification, handleCloseNotification} from 'services/reqres/requests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const dispatch = useDispatch()
  
  const resolver = useYupValidationResolver(loginSchema)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const onSubmit = data => {
    dispatch(asyncLogin({ email: data.email, password: data.password }));
  }

  useAutoLogin() 



  return (
    <div className='flex h-full justify-between'>
    <div className='flex w-full flex-col items-center justify-center rounded-lg p-4 '>
      <img className="rounded-full bg-white" style={{width:'40%'}} src={require('../assets/libertad.png')} alt="Logo" />
      <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-blue-800">
        MDRRMO-LIBERTAD
      </h2>
    </div>
    <div className='w-2/4 flex justify-center flex-col p-4' style={{background:"rgb(11, 90, 129)"}}>
      <h2 className="text-center text-6xl font-bold leading-9 tracking-tight text-white">
        Sign in
      </h2>
      <div className="mt-10 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form space-y-8 text-white">
          <InputField
            label="Email address"
            name="email"
            type="email"
            autoComplete={'current-email'}
            error={errors.email}
            {...register('email')}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            autoComplete={'current-password'}
            error={errors.password}
            {...register('password')}
          />

          <input
            type="submit"
            value="Sign in"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
        </form>
        <ToastContainer />
        {/* <NotificationComponent
        open={Notification.open}
        message={Notification.message}
        severity={Notification.severity}
        onClose={handleCloseNotification}
      /> */}

        {/* <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account ?
          <span>
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign up
            </Link>
          </span>
        </p> */}
      </div>
    </div>  
    </div>
  )
}

export default Login
