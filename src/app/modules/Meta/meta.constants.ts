/* eslint-disable @typescript-eslint/no-explicit-any */
export function calculateStartDate(duration: string): Date {
  const startDate = new Date();
  if (duration === 'month') {
    startDate.setMonth(startDate.getMonth() - 1);
  } else if (duration === 'week') {
    startDate.setDate(startDate.getDate() - 6);
  } else if (duration === 'hours') {
    startDate.setHours(startDate.getHours() - 24);
  } else if (duration === 'year') {
    startDate.setFullYear(startDate.getFullYear() - 1);
  }
  return startDate;
}

export function formatResult(
  customers: any[],
  duration: string,
  startDate: Date,
): any[] {
  const result: any[] = [];
  const currentDate = new Date();

  const customerMap = new Map<string, number>();
  customers.forEach((customer) => {
    let formattedDate;

    if (duration === 'year') {
      formattedDate = new Date(customer.name).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }

    if (duration === 'month' || duration === 'week') {
      formattedDate = new Date(customer.name).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      });
    }

    if (duration === 'hours') {
      formattedDate = new Date(customer.name).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        hour12: true,
      });
    }

    customerMap.set(formattedDate!, customer.quantity);
  });

  if (duration === 'year') {
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );
      const formattedDate = monthDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      result.push({
        name: formattedDate,
        quantity: customerMap.get(formattedDate) || 0,
      });
    }
  } else if (duration === 'month') {
    const tempDate = new Date(startDate);
    while (tempDate <= currentDate) {
      const dateStr = tempDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      });
      result.push({
        name: dateStr,
        quantity: customerMap.get(dateStr) || 0, // Get the count from the map, or default to 0 if not found
      });
      tempDate.setDate(tempDate.getDate() + 1);
    }
  } else if (duration === 'week') {
    const tempDate = new Date(startDate);
    while (tempDate <= currentDate) {
      // Format tempDate to match the format of dates in customerMap
      const formattedDate = tempDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });
      result.push({
        name: formattedDate,
        quantity: customerMap.get(formattedDate) || 0,
      });
      tempDate.setDate(tempDate.getDate() + 1);
    }
  } else if (duration === 'hours') {
    const tempDate = new Date(startDate);
    let hourCount = 0;

    while (tempDate <= currentDate && hourCount < 24) {
      const hourStr = tempDate.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        hour12: true,
      });
      result.push({
        name: hourStr,
        quantity: customerMap.get(hourStr) || 0,
      });

      tempDate.setHours(tempDate.getHours() + 1);

      hourCount++;
    }
  }
  return result;
}
