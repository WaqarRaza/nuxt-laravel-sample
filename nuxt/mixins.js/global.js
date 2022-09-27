import Vue from 'vue'

export const global = {
    data() {
        return {}
    },
    filters: {},
    methods: {
        toast(msg, type = 'success') {
            Vue.swal.fire({
                toast: true,
                position: "top-end",
                timer: 2500,
                isDismissed: true,
                showConfirmButton: false,
                timerProgressBar: true,
                icon: type,
                title: msg,
            });
        },
    }
}

export default global