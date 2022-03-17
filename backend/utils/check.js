const check = (params, body) => {
    if (Object.entries(body).length > 0) {
        let isValid = true;
        params.forEach((param) => {
            if (!(param in body) || body[param].length === 0) {
                isValid = false;
            }
        });
        return isValid;
    }
    else{
        return false;
    }    
}

export { check };