//Functions -----------------------------------------------
/**
 * Creates a random integer within a given range
 * @param  {Int} min Start range
 * @param  {Int} max End range
 * @returns {Int} Random value within range
 */
function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min - 1)) + min;
}

/**
 * Creates a random hex colour
 * @returns {Int} Random hex color code
 */
function randColor() {
    return "#000000".replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });
}

/**
 * Geneates a uptime message for the system
 * @returns {String} A human readable string of uptime
 */
function cpuUsage() {
    let msec = Number(process.uptime().toFixed(0)) * 1000;
    let days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    let hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    let mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    let secs = Math.floor(msec / 1000);

    let timestr = "";

    if (days > 0) timestr += days + " days ";
    if (hours > 0) timestr += hours + " hours ";
    if (mins > 0) timestr += mins + " minutes ";
    if (secs > 0) timestr += secs + " seconds";

    return timestr;
}

/**
 * Random alpha numberic number generation
 * @param  {Int} len Length of it
 * @returns {String} The resultant
 */
function randAlphaNumeric(len: number) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

/**
 * Round a number to set decimal places
 * @param  {Int} number Number to be rounded
 * @param  {Int} decimalPlace How many decimal places to round to
 * @returns {Int} Resulting value
 */
function round (number: number, decimalPlace: number) {
    return Number(number.toFixed(decimalPlace));
}

/**
 * Returns the date of a snowflake
 * @param {string} snowflake A Discord Snowflake
 * @returns {string} Date of the string
 */
function snowflake (snowflake: number) {
    return new Date((snowflake * Math.pow(2, -22)) + 1420070400000).toUTCString();
}

/**
 * Checks if a string __includes__ or __contains__ a number
 * @param {string} str The string to check for numbers
 * @returns {boolean} Whether or not it contains numbers
 */
function hasNumber (str: string) {
    return /\d/.test(str);
}

/**
 * Checks whether a string is a number or a number is a string
 * @param {any} n The string / number or whatever to parse
 * @returns {boolean}
 * @author JerkisNow
 */
function isNumber (n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Returns process uptime in a human readablel format
 * @returns {string} The result
 */
function uptime() {
    let msec = Number(process.uptime().toFixed(0)) * 1000;
    let days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    let hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    let mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    let secs = Math.floor(msec / 1000);
    let timestr = "";

    if (days > 0) timestr += days + "d ";
    else if (hours > 0) timestr += hours + "h ";
    else if (mins > 0) timestr += mins + "m ";
    else if (secs > 0) timestr += secs + "s";

    return timestr
}

//Array prototypes ----------------------------------------
declare global {
    interface Array<T> {
        shuffle: Function;
        random(a: T): Function;
    }
}
/**
 * Shuffles an array psuedorandomly
 * @extends {Array}
 * @returns {Array} An array which has psuedorandomly shuffled
 * @author Cadence#3263
 */
Array.prototype.shuffle = function() {
    let old = [...this];
    let output = [];
    while (old.length) {
        let random = old.splice(Math.floor(Math.random() * old.length), 1)[0];
        output.push(random);
    }
    return output;
}

/**
 * Gets a random element from an array
 * @extends {Array}
 * @returns {Array} The array randomized
 */
Array.prototype.random = function() {
    let out = [...this];
    return out[~~(out.length * Math.random())];
}

//Object prototypes ---------------------------------------
declare global {
    interface Object {
        isArray: Function;
    }
}


/**
 * Is the attached object an Array?
 * @extends {Object}
 * @returns {Boolean} Whether or not the object is an array
 */
Object.prototype.isArray = function() {
    return Array.isArray(this) ? true : false;
}

//Shortcuts -----------------------------------------------
const randColour = () => randColor();

//Export

export {
    round,
    randAlphaNumeric,
    randInt,
    randColor,
    randColour,
    cpuUsage,
    snowflake,
    hasNumber,
    isNumber,
    uptime
}