export const runtime = 'edge';
import CreateAccountBox from "../components/account/CreateAccountBox";
import LoginForm from "../components/account/LoginForm";

export default function login() {
    return (
        <div className="flex items-center justify-center h-full">
            <section className="">
                <div className="container mx-auto pt-8">
                    <div className="flex flex-wrap gap-5 md:flex-nowrap md:pb-20 max-w-6xl">
                        <div className="w-full md:w-1/2">
                            <LoginForm />
                        </div>
                        <div className="w-full md:w-1/2">
                            <CreateAccountBox />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
