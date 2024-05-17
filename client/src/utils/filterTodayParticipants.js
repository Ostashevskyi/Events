import moment from "moment";
import { formatDate } from "./formatDate";

export const filterTodayParticipants = ({ participants }) => {
  const dateNow = formatDate(moment().format());

  return participants?.filter(
    (participant) => formatDate(participant?.date) === dateNow
  ).length;
};
