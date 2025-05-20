'use client'
import {login} from './action'
import { useFormState } from 'react-dom';

export default function Page() {
    const initState = {
        message : " "
    }
    const [state,formAction] = useFormState(login,initState)

  return (
    <>
      <form action={formAction}>
        <div>Email: 
          <input type="text" name="email"/>
        </div>
        <div>Password:
          <input type="password" name="password"/>
        </div>
        <div>
            message : {state.message}
        </div>
        <button>Login</button>
      </form>
    </>
  );
}
