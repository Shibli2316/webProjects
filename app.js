const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check data entry, no named found"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    rating: 7,
    review: "Peaches are lovely"
});

// fruit.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);

const mango = new Fruit({
    name: "Mango",
    rating: 6,
    review: "amazing"
});
mango.save();


// const pineapple = new Fruit({
    // name: "Pineapple",
    // rating: 9,
    // review: "Good amazing"
// });
// pineapple.save();


People.updateOne({name: "John"},  {favFruit: mango}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Updated");
    }

}) ;

// const people = new People({
    // name: "Amy",
    // age: 12,
    // favFruit: pineapple
// });

//people.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 7,
//     review: "Good"
// });

// const orange = new Fruit({
//     name: "Orange",
//     rating: 7,
//     review: "Good"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 7,
//     review: "Good"
// });


// // Fruit.insertMany([kiwi, orange, banana], function(err){
// //     if(err){
// //         console.log(err);
// //     } else{
// //         console.log("Successfully saved");
// //     }
// // });

// Reading the database
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else{
        mongoose.connection.close();
        // fruits.forEach(function(fruit){
            // console.log(fruit.name);
        // });
        console.log(fruits);
    }
});

// Fruit.updateOne({_id: "6311ddf8dddbee1a16e6426e"}, {name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Updated");
//     }
// });

// People.deleteMany({name: "John"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Deleted");
//     }
// });


// Fruit.deleteOne({name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Deleted");
//     }
// });



const findDocuments = function(db, callback){
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}