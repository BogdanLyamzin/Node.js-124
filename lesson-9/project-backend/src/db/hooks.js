export const handleMongooseError = (error, doc, next)=> {
  error.status = 400;
  next(error);
};

export const setUpdateOptions = function(){
  this.setOptions({
    runValidators: true,
    returnDocument: "after"
  })
};
