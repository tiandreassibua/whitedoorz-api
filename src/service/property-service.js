import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createSlug } from "../utils/generateSlug.js";
import {
  createPropertyValidation,
  getPropertyValidation,
  searchPropertyValidation,
} from "../validation/property-validation.js";
import { validate } from "../validation/validation.js";

const search = async (request) => {
  request = validate(searchPropertyValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];
  if (request.name) {
    filters.push({
      name: {
        contains: request.name,
      },
    });
  }

  if (request.city) {
    filters.push({
      city: {
        contains: request.city,
      },
    });
  }

  const properties = await prismaClient.property.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.property.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: {
      properties,
      paging: {
        page: request.page,
        totalPage: Math.ceil(totalItems / request.size),
        totalItem: totalItems,
      },
    },
  };
};

const show = async (slug) => {
  const property = await prismaClient.property.findUnique({
    where: { slug },
    include: {
      rooms: {
        select: {
          id: true,
          name: true,
          image: true,
          price: true,
          maxPeople: true,
          bedQty: true,
          available: true,
        },
      },
      review: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          body: true,
          rating: true,
          createdAt: true,
        },
      },
    },
  });

  if (!property) {
    throw new ResponseError(404, "property is not found");
  }

  return property;
};

const create = async (request) => {
  const property = validate(createPropertyValidation, request);
  property.slug = await createSlug(property.name);
  property.location = property.location.split("src=")[1].split('"')[1];

  return prismaClient.property.create({ data: property });
};

const update = async (propId, request) => {
  const property = validate(createPropertyValidation, request);
  const id = validate(getPropertyValidation, propId);

  property.slug = await createSlug(property.name);
  property.location = property.location.split("src=")[1].split('"')[1];

  return prismaClient.property.update({
    where: { id },
    data: property,
  });
};

const remove = async (propId) => {
  const id = validate(getPropertyValidation, propId);

  const property = await prismaClient.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new ResponseError(404, "property is not found");
  }

  return prismaClient.property.delete({ where: { id } });
};

export default { search, create, update, remove, show };
