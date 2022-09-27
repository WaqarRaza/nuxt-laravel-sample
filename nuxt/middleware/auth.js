import ls from "localstorage-slim";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!ls.get('access_token')) {
        return redirect('/')
    }
}