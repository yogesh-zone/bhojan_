class ApiFeature {
  constructor(query, querystr) {
    // query => mongo.find() , querystr =>req.query
    this.query = query;
    this.querystr = querystr;
    this.temp = query;
  }

   search(){
    const Rname = this.querystr.name
      ? {
          name: { $regex: this.querystr.name, $options: "i" },
        }
      : {};
    this.temp = this.query.find({...Rname});
    if(this.temp !== []) this.query = this.temp;
    
    const Rcategory = this.querystr.category
    ? {
      category: { $regex: this.querystr.category, $options: "i" },
    }
    : {};
    this.temp = this.query.find({...Rcategory});
    if(this.temp !== []) this.query = this.temp;
    
    const Raddress = this.querystr.area
    ? {
      address: { $regex: this.querystr.area, $options: "i" },
    }
    : {};
    this.temp = this.query.find({...Raddress});
    if(this.temp !== []) this.query = this.temp;
    
    // filter for prize 
    let prize = {};
    if (this.querystr.prize){
      prize = JSON.stringify(this.querystr.prize)
      prize = prize.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      prize = `{"prize":${prize}}`;
      prize = JSON.parse(prize);
    } this.temp = this.query.find({...prize});
    if(this.temp !== []) this.query = this.temp;
    
    // filter for rating
    let rating = {};
    if (this.querystr.rating) {
      rating = JSON.stringify(this.querystr.rating);
      rating = rating.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      rating = `{"rating":${rating}}`;
      rating = JSON.parse(rating);
    }this.query = this.query.find({...rating});
    
    return this;
  }

  pagination(resultPerPage) {
    const currPage = Number(this.query.page) || 1;

    const skip = resultPerPage * (currPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
