function checkStringLength(string, maxLength) {
  return string.length <= maxLength;

}

function isPalindrom(string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}

function getInteger(string) {
  string = string.toString();
  let integer = '';
  for (let i = 0; i < string.length; i++) {
    const parsed = parseInt(string[i], 10);
    if (Number.isNaN(string[i]) !== true) {
      integer += parsed;
    }
  }
  return integer.length > 0 ? parseInt(integer, 10) : NaN;
}

const checkDuration = function(startTime, endTime, startMeeting, meetingDuration) {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startTimeMinutes = toMinutes(startTime);
  const endTimeMinutes = toMinutes(endTime);
  const startMeetingMinutes = toMinutes(startMeeting);
  const meetingEndMinutes = startMeeting + meetingDuration;

  return startMeetingMinutes >= startTimeMinutes && meetingEndMinutes <= endTimeMinutes;
};
