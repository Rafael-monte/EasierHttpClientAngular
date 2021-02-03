export {isDefined} 

    function isDefined(value) {
        return value === null || value === undefined || isNaN(value);
    }