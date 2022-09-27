export default function ({$axios, $auth, redirect, store}) {

    // $axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $axios.defaults.headers.common["Content-Type"] = "application/json";
    $axios.defaults.headers.common["Accept"] = "application/json";
    $axios.onRequest((config) => {
        config.headers = {
            'Authorization': `Bearer ${store.state.auth.access_token}`,
        }
    })

    $axios.onError((error) => {
        if (error.response.status === 500) {
            redirect('/error')
        }
    })
}
//