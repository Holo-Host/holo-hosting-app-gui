import { DateTimeString, checkifValidDateTimeString } from './types';
import * as luxon from 'luxon';

export const get_current_datetime = () => {
  const today = luxon.DateTime.local();
  console.log("LUXON `TODAY` OBJECT", today);
  return today;
}

export const create_datetime_from_nums = (yyyy:any, m:any, d:any, hour24:any, min:any) => {
  return luxon.DateTime.local(yyyy, m, d, hour24, min);
}


export const toDateTimeString = (date: any): DateTimeString => {
  if (typeof date === 'string') {
    if (checkifValidDateTimeString(date)) {
      return date;
    }
    else {
      throw new Error(`Invalid date string: ${date}`);
    }
  }
  else {
    // const dateString = luxon.DateTime.fromISO(date.toISOString());
    const dateString = date.toISODate();
    if (checkifValidDateTimeString(dateString)) {
      return dateString;
    }
  }
  throw new Error(`The following invalid DateTimeString was provided: ${date}`);
}

export const getDisplayName = (agentHash: string) => {
  if (agentHash.length > 15 ) {
    return agentHash.substring(0,15) + "...";
  }
  else {
    return agentHash;
  }
}
