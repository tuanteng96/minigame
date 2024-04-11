export const PathHelper = {
    toAbsoluteUrl: () => '',
    toAbsolutePath: (path) =>
        import.meta.env.BASE_URL + path
}