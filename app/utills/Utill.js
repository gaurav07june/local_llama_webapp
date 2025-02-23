
export const showLog = (title, message) => {
    if (__DEV__) {
        console.log(title, message);
    }
};