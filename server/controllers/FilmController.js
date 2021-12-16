import Film from "../models/Film.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
export const createFilm = async (req, res) => {
  try {
    const { name, type, gene, country, description, actors, avgRating, url } =
      req.body;
    if (!name) {
      return res
        .status(401)
        .json({ success: false, message: "missing film name" });
    }
    const film = await Film.findOne({ name });
    if (film) {
      return res
        .status(404)
        .json({ success: false, message: "film name is already existed" });
    }
    const newFilm = new Film({
      name,
      type,
      gene,
      country,
      description,
      actors,
      avgRating,
      url,
    });
    try {
      await newFilm.save();
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "error at creating film" });
    }
    return res.status(200).json({
      success: true,
      message: "Adding film successfully",
      film: newFilm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Find the film by Id (Read)
export const getFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id); // search by value _id in mongoose
    if (film) {
      const id_comments = film.commentList;
      let user_name_comment = [];
      let user_username_comment = [];
      let user_image_comment = [];
      let comment_content = [];
      for (let item of id_comments) {
        let user = await Comment.findOne({ _id: item })
          .populate("idUser")
          .select("username name image");
        user_name_comment.push(user.idUser.name);
        user_username_comment.push(user.idUser.username);
        user_image_comment.push(user.idUser.image);
        let cmt = await Comment.findOne({ _id: item });
        comment_content.push(cmt.content);
      }
      let comment_info = [
        user_name_comment,
        user_username_comment,
        user_image_comment,
        comment_content,
      ];
      console.log(comment_info);

      const id_reviews = film.reviewList;
      let user_name_review = [];
      let user_username_review = [];
      let user_image_review = [];
      let review_content = [];
      let review_rating = [];
      for (let item of id_reviews) {
        let review = await Review.findOne({ _id: item });
        review_content.push(review.content);
        review_rating.push(review.rating);
        let user = await Review.findOne({ _id: item })
          .populate("idUser")
          .select("name username image");
        user_name_review.push(user.idUser.name);
        user_username_review.push(user.idUser.username);
        user_image_review.push(user.idUser.image);
      }

      let rating_info = [
        user_name_review,
        user_username_review,
        user_image_review,
        review_content,
        review_rating,
      ];

      return res.status(200).json({
        success: true,
        message: "finding successfully",
        film: film,
        comment_info,
        rating_info,
      });
    }
    return res.status(404).json({ success: false, message: "Incorret Id" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

//update Film
export const updateFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res
        .status(404)
        .json({ success: false, message: "Film not found" });
    }
    const {
      name,
      type,
      gene,
      country,
      description,
      actors,
      avgRating,
      url,
      commentList,
      reviewList,
    } = req.body;
    film.name = name || film.name;
    film.type = type || film.type;
    film.gene = gene || film.gene;
    film.country = country || film.country;
    film.description = description || film.description;
    film.actors = actors || film.actors;
    film.avgRating = avgRating || film.avgRating;
    film.url = url || film.url;
    film.commentList = commentList || film.commentList;
    film.reviewList = reviewList || film.reviewList;
    let updatedFilm = null;
    try {
      updatedFilm = await film.save(); //  check If the name is unique?
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "Name must be unique" });
    }

    return res.status(200).json({
      success: true,
      message: "update film successfully",
      film: updatedFilm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res
        .status(404)
        .json({ success: false, message: "film not found" });
    }
    const deletedFilm = await film.remove();
    return res.status(200).json({
      success: true,
      message: "delete successfully",
      film: deletedFilm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// export const updateAll=async(req,res)=>{
//     let films=await Film.find({})
//     for(let film of films){
//         film.commentList=[]
//         film.reviewList=[]
//         await film.save()
//     }
//     return res.status(200).json({success:true.valueOf,films})
//   }

export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.find({});
    return res
      .status(200)
      .json({ success: true, message: "find all film", films });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Find the film by Genre (Read)
export const getFilmsWithFilter = async (req, res) => {
  try {
    //get filter and arg from params
    const { filter, arg } = req.params;

    let films = await Film.find({ [filter]: arg });

    if (films.length > 0) {
      let comment_infos = [];
      let rating_infos = [];

      for (let film of films) {
        const id_comments = film.commentList;
        let user_name_comment = [];
        let user_username_comment = [];
        let user_image_comment = [];
        let comment_content = [];
        for (let item of id_comments) {
          let user = await Comment.findOne({ _id: item })
            .populate("idUser")
            .select("username name image");
          user_name_comment.push(user.idUser.name);
          user_username_comment.push(user.idUser.username);
          user_image_comment.push(user.idUser.image);
          let cmt = await Comment.findOne({ _id: item });
          comment_content.push(cmt.content);
        }
        let comment_info = [
          user_name_comment,
          user_username_comment,
          user_image_comment,
          comment_content,
        ];
        console.log(comment_info);
        comment_infos.push(comment_info);

        const id_reviews = film.reviewList;
        let user_name_review = [];
        let user_username_review = [];
        let user_image_review = [];
        let review_content = [];
        let review_rating = [];
        for (let item of id_reviews) {
          let review = await Review.findOne({ _id: item });
          review_content.push(review.content);
          review_rating.push(review.rating);
          let user = await Review.findOne({ _id: item })
            .populate("idUser")
            .select("name username image");
          user_name_review.push(user.idUser.name);
          user_username_review.push(user.idUser.username);
          user_image_review.push(user.idUser.image);
        }

        let rating_info = [
          user_name_review,
          user_username_review,
          user_image_review,
          review_content,
          review_rating,
        ];
        rating_infos.push(rating_info);
      }

      return res.status(200).json({
        success: true,
        message: "finding successfully",
        films: films,
        comment_infos,
        rating_infos,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "There isn't a film with that genre" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
