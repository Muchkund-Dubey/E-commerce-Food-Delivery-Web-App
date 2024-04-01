/*const mongoose = require('mongoose');
//const mongoURI = 'mongodb+srv://Gofood:DubeyJee06@cluster0.5zibyda.mongodb.net/Gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
const mongoURI = 'mongodb://Gofood:DubeyJee06@ac-m6dmbfw-shard-00-00.5zibyda.mongodb.net:27017,ac-m6dmbfw-shard-00-01.5zibyda.mongodb.net:27017,ac-m6dmbfw-shard-00-02.5zibyda.mongodb.net:27017/Gofoodmern?ssl=true&replicaSet=atlas-cnlauq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
  await mongoose.connect(mongoURI,{ useNewUrlParser: true },async(err,result)=>{
    if (err) console.log("---", err)
    else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(function(err, data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err,catData){
            if (err) console.log(err);
            else{
              global.food_items = data;
              global.foodCategory = catData;
            }
        })
        
      })
    }
  });

};

mongoDB();*/
  /*try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    global.food_items = data;
    console.log(global.food_items);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }*/

  const mongoose = require('mongoose');

  const mongoURI = 'mongodb://Gofood:DubeyJee06@ac-m6dmbfw-shard-00-00.5zibyda.mongodb.net:27017,ac-m6dmbfw-shard-00-01.5zibyda.mongodb.net:27017,ac-m6dmbfw-shard-00-02.5zibyda.mongodb.net:27017/Gofoodmern?ssl=true&replicaSet=atlas-cnlauq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
  
  const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      console.log('Connected to MongoDB');
  
      const fetched_data = await mongoose.connection.db.collection('food_items').find({}).toArray();
      global.food_items = fetched_data;
  
      const foodCategory = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
      global.foodCategory = foodCategory;
  
      console.log('Data fetched successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  mongoDB();
  












  










