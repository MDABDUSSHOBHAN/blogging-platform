import { Query } from "mongoose";
//this is for query builder class_________>>>>>
class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }



    search(searchableFields: string[]): this {
        const searchTerm = this.query?.searchTerm;
    
        // Validate that searchTerm is a non-empty string
        if (typeof searchTerm === "string" && searchTerm.trim()) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" }
                })),
            });
        }
    
        return this;
    }
    

  filter(){
    const queryObj = {...this.query}
    const excludingImportant = ["searchTerm","page","limit","sortOrder", "sortBy", "fields"];
    excludingImportant.forEach(key => delete queryObj[key]);
    this.modelQuery = this.modelQuery.find(queryObj)
    return this
  }

  paginated(){
    const page = Number(this.query?.page)|| 1;
    const limit = Number(this.query?.limit) || 10;
    // skip = (page-1)*limit
    const skip = (page-1)*limit;
    this.modelQuery= this.modelQuery.skip(skip).limit(limit);
    return this;
  }


  sort(){
    let sortStr;

    if(this.query?.sortBy&& this.query?.sortOrder){
        const sortBy = this.query?.sortBy;
        const sortOrder = this.query?.sortOrder;
        // "-price" othoba "price"
         sortStr = `${sortOrder ==="desc"?'-':''}${sortBy}`
    }

    this.modelQuery = this.modelQuery.sort(sortStr)
    return this
  }

  select(){
    let fields = "-__v";
  if(this.query?.fields){
    fields = (this.query.fields as string).split(",").join(" ");
  }
  this.modelQuery = this.modelQuery.select(fields);
  return this
  }
  

}

export default QueryBuilder;