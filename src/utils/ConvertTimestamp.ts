export const convertTimestamp = (time: number): string => {
    const unit = {
      year: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
      month: 30 * 7 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
    };
  
    const diff = Date.now() - time;
    for (const key in unit) {
      if (diff > unit[key as keyof typeof unit]) {
        const timePassed = Math.floor(diff / unit[key as keyof typeof unit]);
        return `${timePassed} ${key}${timePassed > 1 ? "s" : ""}`;
      }
    }
  
    return "Just now";
  };