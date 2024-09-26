import { MetaService } from './meta.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const FetchDashboardMetaData = catchAsync(async (req, res) => {
  const result = await MetaService.FetchDashboardMetaData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meta data retrieval successfully!',
    data: result,
  });
});

const OrderAreaChart = catchAsync(async (req, res) => {
  const result = await MetaService.OrderAreaChart(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Chart-Data retrieval successfully!',
    data: result,
  });
});

export const MetaController = {
  OrderAreaChart,
  FetchDashboardMetaData,
};
