const express=require('express');
const mongoose=require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movie_application")
}

const movieSchema = new mongoose.Schema ({
    movie_name:{type:String, required:true},
    movie_genre:{type:String, required:true},
    production_year:{type:Number, required:true},
    budget:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true
});

const Movie = mongoose.model("movie",movieSchema)

const app = express();

app.use(express.json());

app.post("/movies", async (req, res) => {
    try {
        const movie= await Movie.create(req.body);
        return res.status(200).send(movie);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
});

app.get("/movies", async (req, res) => {
    try {
        const movies= await Movie.find().lean().exec();
        return res.send(movies);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})

app.get("/movies/:id", async (req, res) =>{
    try {
        const movie= await Movie.findById(req.params.id).lean().exec();
        return res.send(movie);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})

app.patch("/movies/:id", async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id , req.body,{new:true});
        return res.status(201).send(movie);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})

app.delete("/movies/:id", async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(movie);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})

app.listen(2525,async ()=> {
    await connect();
    console.log("listning to port 2525")
})