interface Props{
    message: string
}

export default function CredentialError(props: Props){
    return (
        <div className="flex justify-center mt-4">
            <div className="alert alert-error shadow-lg w-96">
                <span>{props.message}</span>
            </div>
        </div>
    );
}