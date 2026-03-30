export default function TestPage(){
    return <h1>{localStorage.getItem('token')}</h1>
}