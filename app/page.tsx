import {LoginButton} from "@/components/auth/login-button"
import {Button} from "@/components/ui/button"

export default function Home() {
    return (
        <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 to-green-800'>
            <div className="space-y-6 text-center">
                <h1 className="text-6xl font-semibold text-white drop-shadow-md">Auth</h1>
                <div>
                    <LoginButton>
                        <Button variant='secondary' size='lg'>
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}
