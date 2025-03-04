'use client'

import { Button } from '@heroui/react'
import { useActionState } from 'react'
import { continueWithGoogle } from './action'
import { GoogleIcon } from '@/components/ui/icons'

export const OauthButton = () => {
  const [state, formAction, pending] = useActionState(continueWithGoogle, null)
  return (
    <form action={formAction}>
      <Button
        type="submit"
        fullWidth
        radius="sm"
        className="bg-transparent border-2 border-gray-400  font-semibold "
        startContent={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
    </form>
  )
}
