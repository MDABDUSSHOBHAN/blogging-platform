import mongoose from 'mongoose';
import QueryBuilder from '../../../querybuilder/querybuilder'
import { IBlog } from './tour.interface'
import Blog from './tour.model';
import Tour from './tour.model'

const createTour = async (payload: IBlog) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload).populate('author', '_id name email');

  //   data.color = "red"

  const result = await (await data).save()
  return result
}



const getTours = async (query:Record<string,unknown>) => {

//   const searchTerm = query?.searchTerm || '';

//   console.log('main',query);

//   const queryObj = {...query};
//   //ami aikhane searchTerm ta bad demu---
//   const excludingImportant = ["searchTerm","page","limit","sortOrder", "sortBy", "fields"];
//   excludingImportant.forEach(key => delete queryObj[key]);

//   console.log(queryObj);

//   const searchQuery = Tour.find({$or:searchableFields.map((field) => ({[field]:{$regex:searchTerm,$options:"i"}}))})

//   const filterQuery =  searchQuery.find(queryObj);



// //This is for paginination_______>

// // // filtering
//   // const result = await searchQuery.find(queryObj);
 

//   // 1 -->10 {4-> 31-40
//   // skip limit

//   const page = Number(query?.page)|| 1;
//   const limit = Number(query?.limit) || 10;
//   // skip = (page-1)*limit
//   const skip = (page-1)*limit;

//    //const result = await filterQuery.skip(skip).limit(limit)
//   const paginatedQuery = filterQuery.skip(skip).limit(limit);

// //here is the logic of sorting

//   let sortStr;

//   if(query?.sortBy&& query?.sortOrder){
//       const sortBy = query?.sortBy;
//       const sortOrder = query?.sortOrder;
//       // "-price" othoba "price"
//        sortStr = `${sortOrder ==="desc"?'-':''}${sortBy}`
//   }

//   //  const result = await paginatedQuery.sort(sortStr);
//       const sortQuery =  paginatedQuery.sort(sortStr);

//   let fields = "-__v";
//   if(query?.fields){
//     fields = (query.fields as string).split(",").join(" ");

//   }
  //onst result = await sortQuery.select(fields);

     const searchableFields = ["name","title","content","_id","startLocation","locations"]

  //  const tours = new QueryBuilder(Blog.find()
  //  .populate('author','_id name email')
  // ,
  //  query).search(searchableFields).filter().sort().paginated().select().filter();
  // console.log(tours);
  //  const result = await tours.modelQuery;

//this is fro new

//   const searchTerm = query?.searchTerm || '';
//   const queryObj = {...query};
//   console.log(queryObj)

//   console.log('main',searchTerm);

//   const excludingImportant = ["searchTerm","page","limit","sortOrder", "sortBy", "fields"];
//     excludingImportant.forEach(key => delete queryObj[key]);
  
//      const searchQuery = Blog.find({$or:searchableFields.map((field) => ({[field]:{$regex:searchTerm,$options:"i"}}))})

//   const filterQuery =  searchQuery.find(queryObj);
//   console.log('afterFilter',filterQuery);

// const result = await Blog.find().populate('author','_id name email').select('_id title content author')
   


//new

//const searchableFields = ['name', 'title', 'content', '_id', 'startLocation', 'locations'];
const search = query?.search || ''; // Extract search from query
console.log('search:', search);

const queryFilters = { ...query };
console.log('queryFilters (before exclusions):', queryFilters);

// Extract `filter` for specific author filtering
const authorFilter = queryFilters.filter || null;
delete queryFilters.filter;

// Remove keys that aren't relevant to filters
const excludingImportant = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
excludingImportant.forEach((key) => delete queryFilters[key]);

// Build search conditions for `search`
const searchConditions = searchableFields
  .map((field) => {
    if (field === '_id' && mongoose.Types.ObjectId.isValid(search as string)) {
      return { _id: new mongoose.Types.ObjectId(search as string) }; // Match ObjectId directly
    }

    if (field !== '_id') {
      return { [field]: { $regex: search, $options: 'i' } }; // Case-insensitive regex search
    }

    return null;
  })
  .filter(Boolean); // Remove null values

// Add specific filter for `author` if provided
const filterConditions: any = {};
if (authorFilter && mongoose.Types.ObjectId.isValid(authorFilter as string)) {
  filterConditions.author = new mongoose.Types.ObjectId(authorFilter as string); // Match author ID
}

// Combine all conditions
const finalQueryConditions = {
  ...queryFilters, // Include additional query filters
  ...filterConditions, // Include author-specific filter
  ...(searchConditions.length > 0 ? { $or: searchConditions } : {}), // Add search conditions
};

// Build the query
const finalQuery = Blog.find(finalQueryConditions)
  .populate('author', '_id name email') // Populate author details
  .select('_id title content author createdAt updatedAt'); // Select specific fields

// Sorting implementation
const sortBy = query?.sortBy || 'createdAt'; // Default sorting by createdAt
const sortOrder = query?.sortOrder === 'asc' ? 1 : -1; // Default sorting order is descending
finalQuery.sort({ [sortBy as string]: sortOrder });

// Pagination (optional)
// const page = parseInt(query?.page, 10) || 1; // Default page is 1
// const limit = parseInt(query?.limit, 10) || 10; // Default limit is 10
// finalQuery.skip((page - 1) * limit).limit(limit);

// Execute the query
const result = await finalQuery;
return result;












  //  return result;
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id).populate('author', 'name email')
  return result
}

const updateTour = async (id: string, payload: Partial<IBlog>) => {
  const result = Tour.findByIdAndUpdate(id, payload,{ new: true }).populate('author', '_id name email'); // Populate author with specific fields
    
  return result
}

const deleteTour = async (_id: string) => {
  const result = Tour.findByIdAndDelete(_id)
  return result
}

// const getNextSchedule = async (id: string) => {
//   const tour = await Tour.getNextNearestStartDateAndEndData()
//   //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

//   return {
//     tour,
//     // nextSchedule,
//   }
// }

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,

}