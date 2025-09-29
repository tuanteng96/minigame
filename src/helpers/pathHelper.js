export const PathHelper = {
    toAbsoluteUrl: () => '',
    toAbsolutePath: (path) => {
        // if(import.meta.env.DEV) {
        //     return import.meta.env.BASE_URL + path
        // }
        return import.meta.env.VITE_API + "/brand/minigame/" + path
    },
    toAbsoluteServer: (path) => {
        return import.meta.env.VITE_API + path
    }
}