import slugify from 'slugify';
import QueryBuilder from '../../builder/QueryBuilder';
import appError from '../../errors/appError';
import { ProductSearchableFields } from './order.constants';
import { TProduct } from './order.interface';
import { Product } from './order.model';
import httpStatus from 'http-status';

const createProductDB = async (payload: TProduct) => {
  payload.slug = slugify(payload.title, {
    lower: true,
    replacement: '_',
    trim: true,
  });

  const isAlreadyExist = await Product.findOne({
    slug: payload.slug,
  });

  if (isAlreadyExist) {
    throw new appError(httpStatus.CONFLICT, 'This product is already exists');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProduct = async (query: Record<string, unknown>) => {
  const DoctorQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await DoctorQuery.countTotal();
  const result = await DoctorQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new appError(404, 'Product not found!');
  }

  return result;
};

const deleteProduct = async (id: string) => {
  const findProduct = await Product.findOne({ _id: id });

  if (!findProduct) {
    throw new appError(404, 'Product not found!');
  }

  await Product.findOneAndDelete({ _id: id });

  return null;
};

const updateProduct = async (id: string, payload: TProduct) => {
  const findProduct = await Product.findOne({ _id: id });

  if (!findProduct) {
    throw new appError(404, 'Product not found!');
  }

  //update slug with new title
  if (payload.title) {
    payload.slug = slugify(payload.title, {
      lower: true,
      replacement: '_',
      trim: true,
    });

    const isExist = await Product.findOne({
      slug: payload.slug,
    });

    if (isExist) {
      throw new appError(
        httpStatus.CONFLICT,
        'This product name is already exists',
      );
    }
  }

  const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const ProductService = {
  createProductDB,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
