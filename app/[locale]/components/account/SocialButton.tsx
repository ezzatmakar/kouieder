// import SocialLogin from "react-social-login";

export default function SocialButton({ children, triggerLogin, ...props }: any) {
    return (
        <button onClick={triggerLogin} {...props}>
            {children}
        </button>
    )
}
