"use strict";

import {Datetime_local} from "./Datetime_local.js";
import {Temporal} from '@js-temporal/polyfill';

export type Datetime_global = {
    time: Temporal.ZonedDateTime,
    [Symbol.toStringTag]: string,
    toString(this: Datetime_global): string,
    getTime(this: Datetime_global): number,
    valueOf(this: Datetime_global): number,
    setTime(this: Datetime_global, timestamp: number): number,
    toHTML(this: Datetime_global): string,
    toHTMLString(this: Datetime_global): string,
    // convertion utils
    toDate(this: Datetime_global): Date,
    toTimezone(this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global,
    // builtin-proxy
    getDay(this: Datetime_global): number;
    getYear(this: Datetime_global): number;
    getFullYear(this: Datetime_global): number;
    getMonth(this: Datetime_global): number;
    getDate(this: Datetime_global): number;
    getHours(this: Datetime_global): number;
    getMinutes(this: Datetime_global): number;
    getSeconds(this: Datetime_global): number;
    getMilliseconds(this: Datetime_global): number;
    // setters
    setFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number

    // builtin-proxy-UTC
    getUTCDay(this: Datetime_global): number;
    getUTCYear(this: Datetime_global): number;
    getUTCFullYear(this: Datetime_global): number;
    getUTCMonth(this: Datetime_global): number;
    getUTCDate(this: Datetime_global): number;
    getUTCHours(this: Datetime_global): number;
    getUTCMinutes(this: Datetime_global): number;
    getUTCSeconds(this: Datetime_global): number;
    getUTCMilliseconds(this: Datetime_global): number;
    getTimezoneOffset(this: Datetime_global): number;
    toJSON(this: Datetime_global): string;
    // setters
    setUTCFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number;
    setUTCHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    // custom
    getDayNumberWeek(this: Datetime_global): number;
    getDayNumberMonth(this: Datetime_global): number;
    getDayNumber(this: Datetime_global): number;
    getDayName(this: Datetime_global): string;
    getMonthName(this: Datetime_global): string;
    getFullMonthName(this: Datetime_global): string;
    getFullDayName(this: Datetime_global): string;

    toHTMLDiscordString(this: Datetime_global, f: "R" | "T" | "t" | "f" | "F" | "D" | "d"): string;
    setNanoseconds(this: Datetime_global, nanoseconds: bigint): bigint;
    getNanoseconds(this: Datetime_global): bigint;
    getUTCNanoseconds(this: Datetime_global): bigint;
    toDatetime_local(this: Datetime_global): Datetime_local;

    toISOString(this: Datetime_global): string;
    toTemporalZonedDateTime(): Temporal.ZonedDateTime;

    setMonth(this: Datetime_global, month: number, date?: number): number;
    setDate(this: Datetime_global, date: number): number
    setHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    setMinutes(this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number;
    setSeconds(this: Datetime_global, seconds: number, milliseconds?: number): number;
    setMilliseconds(this: Datetime_global, milliseconds: number): number;
};

interface Datetime_global_constructor {
    prototype: Datetime_global;

    new(from?: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number | undefined,
        timezoneId?: Temporal.TimeZoneLike): Datetime_global,

    (from?: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number | undefined,
     timezoneId?: Temporal.TimeZoneLike): string,

    parse_strict(string: string): Temporal.ZonedDateTime;

    parse(dateString: string, this_parserOnly: boolean): number,

    // padding(strx: string | any, number?: number): string,

    now(): bigint,

    zeroms(): number,

    zerons(): bigint,

    daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthnames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    daynamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthnamesFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    fromComponentsUTC(
        year?: number | undefined, month?: number, date?: number,
        hour?: number, minute?: number, second?: number,
        ms?: number, nanosecond?: bigint | number): bigint,

    getUTCOffset(offset: number): string,

    htmlToCurrentTime(timetags: HTMLTimeElement[]): void,
}

/**
 * constructs a Datetime_global or Datetime_global string based on different conditions
 * @param from {Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number}
 * either one of these classes. if a `bigint` gets passed in then it will be the nanoseconds since the epoch. otherwise
 * it will be the milliseconds since the epoch. relying on implicit convertion of a bigint will probably result in a
 * `TypeError: cant convert BigInt to number` as BigInts will have to be passed explicitly
 * @param timezoneId the Temporal TimezoneId, if left out then local time is assumed `Temporal.Now.timeZoneId()`.
 * @returns {string|Datetime_global} either a string or an instanceof Datetime_global.
 * @constructor
 * @function
 */
export const Datetime_global: Datetime_global_constructor = function (
    this: Datetime_global, from: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number | undefined = undefined,
    timezoneId: Temporal.TimeZoneLike = Temporal.Now.timeZoneId(),
): Datetime_global | string | void {
    let timestamp: number | bigint, isBigInt: boolean = false;
    if (arguments.length === 0 || from === undefined) {
        from = Datetime_global.now();
    }
    if (from instanceof Temporal.ZonedDateTime || from instanceof Temporal.Instant) {
        timestamp = BigInt(from.epochNanoseconds);
        isBigInt = true;
    } else if (from instanceof Datetime_global) {
        timestamp = from.time.epochNanoseconds;
        isBigInt = true;
    } else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    } else {
        timestamp = Math.trunc(+from);
    }
    const time: Temporal.ZonedDateTime = new Temporal.ZonedDateTime(
        BigInt(timestamp) * (isBigInt ? 1n : 1_000_000n),
        timezoneId);
    if (new.target) {
        this.time = time;
    } else {
        return Datetime_global.prototype.toString.call(Object.assign({time}, Datetime_global.prototype));
    }
} as Datetime_global_constructor;

/**
 * forms a date based on Date, returing the nanoseconds since the epoch
 * @param year the year, if under 100 and above 0 then 1900 will be added
 * @param month the zero indexed month
 * @param date the 1 indexed day of the month
 * @param hour the hour
 * @param minute the minute
 * @param second the second
 * @param millisecond the millisecond
 * @param nanosecond the nanosecond
 * @returns {bigint} nanoseconds since the epoch
 */
Datetime_global.fromComponentsUTC = function (
    year: number | string | undefined, month: number = 0, date: number = 1,
    hour: number = 0, minute: number = 0, second: number = 0,
    millisecond: number = 0, nanosecond: bigint | number = 0n): bigint {
    const date_time: Date = new Date();
    if (arguments.length === 1) {
        if (typeof year === 'string') {
            year = Datetime_local.parse(`${year}`, false);
        }
        if (typeof year === "number") {
            date_time.setTime(+year);
        } else {
            date_time.setTime(NaN);
        }
    } else if (arguments.length > 1) {
        if (typeof year === "number") {
            date_time.setTime(Date.UTC(year, month, date, hour, minute, second, millisecond));
        } else {
            date_time.setTime(NaN);
        }
    }
    return (BigInt(+date_time) * 1_000_000n) + BigInt(nanosecond);
};

/**
 * parses a date like `Temporal.ZonedDateTime.from` only
 * @param string
 */
Datetime_global.parse_strict = function (string: string): Temporal.ZonedDateTime {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * The Datetime_local.now() static method returns the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {bigint} the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function (): bigint {
    return Temporal.Now.instant().epochNanoseconds;
};

Datetime_global.zeroms = function (): number {
    return (new Date).setMilliseconds(0);
};

Datetime_global.zerons = function (): bigint {
    return BigInt(Datetime_global.zeroms()) * 1_000_000n;
};

Datetime_global.parse = Datetime_local.parse;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
Datetime_global.prototype.toDate = function (): Date {
    return new Date(this.time.epochMilliseconds);
};
Datetime_global.prototype.toTimezone = function (this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global {
    return new Datetime_global(this.time.epochNanoseconds, timezoneId);
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.valueOf = function (this: Datetime_global): number {
    return this.time.epochMilliseconds;
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.getTime = function (this: Datetime_global): number {
    return this.valueOf();
};
Datetime_global.prototype.setTime = function (this: Datetime_global, timestamp: number | bigint): number {
    this.time = new Temporal.ZonedDateTime(
        BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n),
        this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
/**
 * formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 *
 * note that you can also use this with Date. you just have tto attach something with time.timezoneId
 * @returns {string} formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 */
Datetime_global.prototype.toString = function (this: Datetime_global): string {
    const self: Datetime_global = this, pad = function (strx: string | any, number: number = 2): string {
        return String(strx).padStart(Number(number), '0');
    };
    const offset: string = Datetime_global.getUTCOffset(self.getTimezoneOffset()),
        string: string = `${self.getDayName()} ${self.getFullMonthName()} ${pad(self.getDate())}`,
        time: string = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
    return `${string} ${pad(self.getFullYear(), 4)} ${time} ${offset} (${self.time.timeZoneId})`;
};
/**
 * an insertable HTML String representing this Date using the user's local datetime.
 *
 * @returns {string} an insertable HTML String representing this Date using the user's local datetime.
 * @see {Datetime_global.prototype.toHTMLString} for using any timezone instead of the user's.
 */
Datetime_global.prototype.toHTML = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
};
/**
 * an insertable HTML String representing this Datetime using the specified timezone
 *
 * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
 */
Datetime_global.prototype.toHTMLString = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${this.toString()}</time>`;
};

/**
 * an insertable HTML String representing this Datetime using the specified timezone
 *
 * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
 */
Datetime_global.prototype.toHTMLDiscordString = function (
    this: Datetime_global, f: "R" | "T" | "t" | "f" | "F" | "D" | "d" = 'f'): string {
    let date: Date = new Date(this.time.epochMilliseconds), strx = this.toString();
    const self: Datetime_global = this, pad = function (strx: string | any, number: number = 2): string {
        return String(strx).padStart(Number(number), '0');
    }, t: string = `${pad(self.getHours())}:${pad(self.getMinutes())}`;
    switch (f) {
        case 't':
            strx = t;
            break;
        case 'T':
            strx = `${t}:${pad(self.getSeconds())}`;
            break;
        case 'd':
            strx = `${pad(self.getFullYear(), 4)}-${pad(self.getMonth() + 1)}-${pad(self.getDate())}`;
            break;
        case 'D':
            strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())}`;
            break;
        case 'f':
            strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
            break;
        case 'F':
            strx = `${pad(self.getFullDayName())}, ${pad(self.getFullYear(), 4)}`
                + ` ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
            break;
        case 'R':
            const differenceSeconds: number = Math.trunc(((+new Date) - (+self.getTime())) / 1_000),
                positive: boolean = differenceSeconds >= 0;
            if (differenceSeconds === 0) {
                strx = 'now';
            } else if (Math.abs(differenceSeconds) < 60) {
                strx = `${Math.abs(differenceSeconds)} seconds ${positive ? 'ago' : 'from now'}`;
            } else if (Math.abs(differenceSeconds) < 3600) {
                const minutes = Math.abs(Math.trunc(differenceSeconds / 60));
                strx = `${minutes} minute${minutes !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            } else if (Math.abs(differenceSeconds) < 86400) {
                const hours = Math.abs(Math.trunc(differenceSeconds / 3600));
                strx = `${hours} hour${hours !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            } else {
                const days = Math.abs(Math.trunc(differenceSeconds / 86400));
                strx = `${days} day${days !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            }
            break;
        default:
            throw new Error(`${f} is not valid`);
    }
    return `<time datetime="${date.toISOString()}" data-format="${f}" title="${this.toString()}">${strx}</time>`;
};
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function (this: Datetime_global): number {
    return this.time.dayOfWeek % 7;
};
/**
 * a proxy for `Date.prototype.getYear` or `this.date.getFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getYear = function (this: Datetime_global): number {
    return this.time.year - 1900;
};
/**
 * a proxy for `Date.prototype.getFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getFullYear = function (this: Datetime_global): number {
    return this.time.year;
};
/**
 * a proxy for `Date.prototype.getMonth`
 * @returns {number}
 */
Datetime_global.prototype.getMonth = function (this: Datetime_global): number {
    return this.time.month - 1;
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDate = function (this: Datetime_global): number {
    return this.time.day;
};
/**
 * a proxy for `Date.prototype.getHours`
 * @returns {number}
 */
Datetime_global.prototype.getHours = function (this: Datetime_global): number {
    return this.time.hour;
};
/**
 * a proxy for `Date.prototype.getMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getMinutes = function (this: Datetime_global): number {
    return this.time.minute;
};
/**
 * a proxy for `Date.prototype.getSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getSeconds = function (this: Datetime_global): number {
    return this.time.second;
};
/**
 * a proxy for `Date.prototype.getMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getMilliseconds = function (this: Datetime_global): number {
    return this.time.millisecond;
};
// builtin-proxy-UTC
/**
 * a proxy for `Date.prototype.getUTCDay`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDay = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDay();
};
/**
 * a proxy for `Date.prototype.getUTCYear` or `this.date.getUTCFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getUTCYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear() - 1900;
};
/**
 * a proxy for `Date.prototype.getUTCFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getUTCFullYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear();
};
/**
 * a proxy for `Date.prototype.getUTCMonth`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMonth = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMonth();
};
/**
 * a proxy for `Date.prototype.getUTCDate`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDate = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDate();
};
/**
 * a proxy for `Date.prototype.getUTCHours`
 * @returns {number}
 */
Datetime_global.prototype.getUTCHours = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCHours();
};
/**
 * a proxy for `Date.prototype.getUTCMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMinutes = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMinutes();
};
/**
 * a proxy for `Date.prototype.getUTCSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCSeconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};
/**
 * a proxy for `Date.prototype.getUTCMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMilliseconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMilliseconds();
};
/**
 * a proxy for `Date.prototype.getTimezoneOffset`
 * @returns {number}
 */
Datetime_global.prototype.getTimezoneOffset = function (this: Datetime_global): number {
    return -Math.round((Number(this.time.offsetNanoseconds) / 1e9) / 60);
};

/**
 * converts to `Datetime_local`
 * @deprecated
 * @returns {Datetime_local}
 */
Datetime_global.prototype.toDatetime_local = function (this: Datetime_global): Datetime_local {
    return new Datetime_local(this.time.epochMilliseconds);
};
/**
 * a proxy for `Date.prototype.toISOString`
 * @returns {number}
 */
Datetime_global.prototype.toISOString = function (this: Datetime_global): string {
    return (new Date(this.time.epochMilliseconds)).toISOString();
};
Datetime_global.prototype.toJSON = function (): string {
    return this.time.toJSON();
};
/*Datetime_global.prototype.setFullYear = function (this: Datetime_global, fullYear: number, month?: number, date?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), datetime: Date = new Date(this.time.epochMilliseconds);
    const utc: Temporal.ZonedDateTime = new Temporal.ZonedDateTime(this.time.epochNanoseconds, 'UTC');
    month = arguments.length > 1 ? month : utc.month - 1; date = arguments.length > 2 ? date : utc.day;

    const returnValue: bigint = BigInt(datetime.setUTCFullYear(fullYear, month as number, date as number));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1_000_000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMonth = function (this: Datetime_global, month: number, date?: number): number {
    const self: Date = new Date(this.time.epochMilliseconds);
    date = arguments.length > 1 ? date : self.getUTCDate();
    return this.setFullYear(self.getUTCFullYear(), month, date);
};
Datetime_global.prototype.setDate = function (this: Datetime_global, date: number): number {
    const self: Date = new Date(this.time.epochMilliseconds);
return this.setFullYear(self.getUTCFullYear(), self.getUTCMonth(), date);};*/
Datetime_global.prototype.setHours = function (this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), date: Date = new Date(this.time.epochMilliseconds);
    const utc: Temporal.ZonedDateTime = new Temporal.ZonedDateTime(this.time.epochNanoseconds, 'UTC');
    minutes = arguments.length > 1 ? minutes : utc.minute;
    seconds = arguments.length > 2 ? seconds : utc.second;
    milliseconds = arguments.length > 3 ? milliseconds : utc.millisecond;

    const returnValue: bigint = BigInt(date.setUTCHours(hours,
        (minutes as number) + this.getTimezoneOffset(), seconds as number, milliseconds as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMinutes = function (this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number {
    const self: Date = new Date(this.time.epochMilliseconds);
    seconds = arguments.length > 1 ? seconds : self.getSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : self.getMilliseconds();
    return this.setHours(self.getHours(), minutes, seconds, milliseconds);
};
Datetime_global.prototype.setSeconds = function (this: Datetime_global, seconds: number, milliseconds?: number): number {
    const self: Date = new Date(this.time.epochMilliseconds);
    milliseconds = arguments.length > 1 ? milliseconds : self.getMilliseconds();
    return this.setHours(self.getHours(), self.getMinutes(), seconds, milliseconds);
};
Datetime_global.prototype.setMilliseconds = function (this: Datetime_global, milliseconds: number): number {
    const self: Date = new Date(this.time.epochMilliseconds);
    return this.setHours(self.getHours(), self.getMinutes(), self.getSeconds(), milliseconds);
};
// UTC
Datetime_global.prototype.setUTCFullYear = function (this: Datetime_global, fullYear: number, month?: number, date?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), datetime: Date = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();

    const returnValue: bigint = BigInt(datetime.setUTCFullYear(fullYear, month as number, date as number));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1_000_000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setUTCHours = function (this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), date: Date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();

    const returnValue: bigint = BigInt(date.setUTCHours(hours, minutes as number, seconds as number, milliseconds as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.toTemporalZonedDateTime = function (): Temporal.ZonedDateTime {
    return this.time;
};
Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// custom
/**
 * sets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.setNanoseconds = function (this: Datetime_global, nanoseconds: bigint): bigint {
    return BigInt((this.time = new Temporal.ZonedDateTime(this.time.epochNanoseconds + BigInt(nanoseconds), this.time.timeZoneId)).nanosecond);
};
/**
 * gets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.getNanoseconds = function (this: Datetime_global): bigint {
    return BigInt(this.time.nanosecond);
};
/**
 * gets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.getUTCNanoseconds = function (this: Datetime_global): bigint {
    return BigInt(this.time.nanosecond);
};
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberWeek = function (): number {
    return this.getDay();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumber = function (): number {
    return this.getDate();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberMonth = function (): number {
    return this.getDate();
};

/**
 * returns one of `['Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat']` if `Datetime_global.daynames` isnt Modified, otherwise it returns `string`
 * @returns {'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getDayName = function (): 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | string {
    return Datetime_global.daynames[this.getDay()];
};
/**
 * returns one of `['Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec']` if
 * `Datetime_global.monthnames` isnt Modified, otherwise it returns `string`
 * @returns {'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | string} arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getMonthName = function (): 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | string {
    return Datetime_global.monthnames[this.getMonth()];
};
/**
 * returns one of `['Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday']` if
 * `Datetime_global.daynamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getFullDayName = function (): 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | string {
    return Datetime_global.daynamesFull[this.getDay()];
};
/**
 * returns one of `['January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December']` if
 * `Datetime_global.monthnamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December' | string}
 * arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getFullMonthName = function (): 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December' | string {
    return Datetime_global.monthnamesFull[this.getMonth()];
};
/**
 * format a UTC offset from offset in minutes call
 * @param offset
 */
Datetime_global.getUTCOffset = function (offset: number): string {
    if (isNaN(offset)) return 'UTC+Error';
    const sign: "-" | "+" = offset > 0 ? "-" : "+", absOffset: number = Math.abs(offset);
    const hours: string = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes: string = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
};
Datetime_global.htmlToCurrentTime = function (timetags: HTMLTimeElement[] = []): void {
    Array.from(timetags).forEach(function (each: HTMLTimeElement): void {
        const tz: string = each.getAttribute('data-iana-timezone') ?? Temporal.Now.timeZoneId(),
            d: Datetime_global = new Datetime_global(new Date(each.dateTime), tz);
        each.innerText = d.toString();
    });
};

