const QTD_MAXIMA_CARACTERES = 30;

const removeExtraSpacesFromInput = (text) => text.trim().replace(/\s+/g, " ");

const getListObject = (list, code) => list.find(object => object.code == code);
const getListObjectProperty = (list, code, property) => list.find(object => object.code == code)[property];

const sanitizeName = (name) => {
    const name_wo_extra_spaces = removeExtraSpacesFromInput(name);
    const name_wo_double_quotes = name_wo_extra_spaces.replace(/["]/g, "'");

    if (QTD_MAXIMA_CARACTERES <= name_wo_double_quotes.length)
        return (
            name_wo_double_quotes.substr(0, QTD_MAXIMA_CARACTERES) + "..."
        );

    return name_wo_double_quotes ?? false;
};

const sanitizeInteger = (amount) => {
    const amount_regex = /[0-9]+/;
    const amount_match_result = amount.match(amount_regex);

    return amount_match_result ? parseInt(amount_match_result[0]) : false;
};

const sanitizeTax = (tax) => {
    const tax_regex = /([0-9]{1,3})(\.([0-9]{1,2}))?/;
    return sanitizeFloat(tax_regex, tax);
};

const sanitizePrice = (price) => {
    const price_regex = /([0-9]*)\.?([0-9]{1,2})?/;
    return sanitizeFloat(price_regex, price);
};

const sanitizeFloat = (regex, number) => {
    const number_match_result = number.match(regex);
    return number_match_result ? parseFloat(number_match_result[0]) : false;
};

export {
    getListObject,
    getListObjectProperty,
};
