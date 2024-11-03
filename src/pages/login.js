import useAutoLogin from 'hooks/use-auto-login'
import useYupValidationResolver from 'hooks/use-yup-validation-resolver'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import InputField from 'components/ui-elements/input-field'

import { loginSchema } from 'configs/yup-validation-schemas'

import { asyncLogin } from 'services/reqres/requests'

function Login() {
  const dispatch = useDispatch()

  const resolver = useYupValidationResolver(loginSchema)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const onSubmit = data => {
    console.log('onSubmit', data)
    dispatch(asyncLogin({ email: data.email, password: data.password }))
  }

  useAutoLogin() // will redirect to '/' or '/from-path' if user is logged in

  return (
    <div className="Login borde  flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#21cae917' }}>

      <h2 className="mt-10 mb-10 text-center text-4xl font-bold leading-9 tracking-tight text-blue-800">
          MDRRMO-LIBERTAD
        </h2>   
        <img className="h-30 w-40 rounded-full bg-white" src={require('../assets/libertad.png')} alt="Logo"/>
         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form space-y-6">
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

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account ?
          <span>
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign up
            </Link>
          </span>
        </p>
      </div>

        
      </div>
  
    </div>
  )
}

export default Login
