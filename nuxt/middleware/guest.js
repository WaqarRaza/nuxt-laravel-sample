import ls from 'localstorage-slim'

export default function ({store, redirect}) {
    console.log(ls.get('access_token'))
    if (ls.get('access_token')) {
        return redirect('/dashboard')
    }
}