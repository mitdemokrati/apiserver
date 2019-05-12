const info = (infoMessage: string) => {
    console.log(infoMessage); // tslint:disable-line no-console
};

const error = (errorMessage: Error) => {
    console.error(errorMessage); // tslint:disable-line no-console
};

export default {
    error,
    info,
};
