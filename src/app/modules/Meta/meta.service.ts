import { Order } from '../Order/order.model';
import { User } from '../Users/user.model';
import { calculateStartDate, formatResult } from './meta.constants';
// import { DateTime } from 'luxon';

const FetchDashboardMetaData = async () => {
  const resentOrders = await Order.countDocuments();
  const totalOrders = await Order.countDocuments({ isDeleted: false });
  const totalAdmins = await User.countDocuments({ role: 'admin' });
  const totalSeller = await User.countDocuments({ role: 'seller' });
  const totalSellerRequest = await User.countDocuments({
    role: 'seller',
    isAdminApproved: false,
  });

  return {
    totalSellerRequest,
    resentOrders,
    totalOrders,
    totalAdmins,
    totalSeller,
  };
};

const OrderAreaChart = async (query: Record<string, unknown>) => {
  const duration = query?.duration as string;
  const startDateParams = query?.startDate as string;

  let startDate;
  let endDate;
  if (duration && !startDateParams) {
    startDate = calculateStartDate(duration);
    endDate = new Date();
  }

  if (duration === 'hours' && startDateParams) {
    startDate = new Date(startDateParams);
    endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 24);
  }

  let formateDate = '%d %b';
  if (duration === 'hours') {
    formateDate = '%d %b %H:00';
  } else if (duration === 'year' || duration === 'all') {
    formateDate = '%b %Y';
  }

  const matchStage =
    duration === 'all'
      ? {}
      : {
          createdAt: { $gte: startDate, $lt: endDate },
        };

  const Orders = await Order.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: {
          $dateToString: { format: formateDate, date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        quantity: '$count',
      },
    },
  ]);

  // console.log('Orders---=>', Orders);

  const result =
    duration === 'all' ? Orders : formatResult(Orders, duration!, startDate!);

  // console.log('result--=>', result);

  return result;
};

export const MetaService = {
  FetchDashboardMetaData,
  OrderAreaChart,
};
